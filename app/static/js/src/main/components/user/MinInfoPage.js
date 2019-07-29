import '@babel/polyfill';
import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import { Map } from 'immutable';
import axios from 'axios';

import * as url from '../../../config';

class MinInfoPage extends Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            visible: false,
            data: Map({
                userName: '',
                userId: this.props.userId,
                groupName: '',
                userRank: ''
            })
        }
    }

    showPage = () => {
        this.setState({visible: true});
    }

    loadingPage = () => {
        this.setState({visible: false});
    }

    requestMinimumInfo = () =>{
        return axios.get(url.GET_MIN_USER_INFO_URL);
    }

    getMinimumInfo = async () => {
        this.loadingPage();

        const response = await this.requestMinimumInfo();
        const { user_id, user_name, user_rank, group } = response.data;
        const { data } = this.state;

        this.setState({
            data: data.set('userName', user_name)
                    .set('userId', user_id)
                    .set('groupName', group)
                    .set('userRank', user_rank)
        });

        this.showPage();
    }

    drawMinInfoPage = () => {
        const { data } = this.state;
        const userName = data.get('userName');
        const userId = data.get('userId');
        const userRank = data.get('userRank');
        const groupName = data.get('groupName');
        
        return (
            <div>
                <h2><b>유저 정보(개요)</b></h2>
                <hr />

                <h4>이름 (ID)</h4>
                <p>{userName} ({userId})</p>
                <hr />

                <h4>소속 그룹</h4>
                <p>{groupName}</p>
                <hr />

                <h4>직책</h4>
                <p>{userRank}</p>
            </div>
        );
    }

    componentDidMount = () => {
        this.getMinimumInfo();
    }

    render = () => {
        const { visible } = this.state;

        if(visible)
            return this.drawMinInfoPage();
        else
            return <Spinner animation="border"/>;
    }
}

export default MinInfoPage;