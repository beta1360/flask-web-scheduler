import React, { Component } from 'react';
import { Form, Spinner, Button } from 'react-bootstrap';
import axios from 'axios';

import * as url from '../../../config';
import ModifyInfoForm from './ModifyInfo/ModifyInfoForm';

class ModifyInfoPage extends Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            disable: false,
            visible: true,
            isAuth: false,
            password: ''
        }
    }

    showForms = () => {
        this.setState({visible: true});
    }

    loadingForms = () => {
        this.setState({visible: false});
    }

    setAuth = () => {
        this.setState({isAuth: true});
    }

    handleChangePwd = (e) => {
        this.setState({password: e.target.value});
    }

    disableModifyInfoPage = () => {
        this.setState({ disable: true });
    }

    enableModifyInfoPage = () => {
        this.setState({ disable: false });
    }

    onClickAuthBtn = async () => {
        this.disableModifyInfoPage();

        const { password } = this.state;

        const response = await axios.post(url.CHECK_USER_INFO_URL, {
                                        password: password});

        const { code, message } = response.data;

        if(code == 200){
            this.setAuth();
            this.showForms();
        } 
        else {
            alert(message);
            this.showForms();
        }

        this.enableModifyInfoPage();
    }

    drawAuthForm = () => {
        const { disable } = this.state;

        return (
            <div>
                <hr />
                <h4>비밀번호를 입력해주세요.</h4>
                <p>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>PW</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.handleChangePwd}/>
                    </Form.Group>
                    <br/>
                    {
                        disable?
                        <Button variant="primary">제출</Button>
                        :<Button variant="primary" onClick={this.onClickAuthBtn}>제출</Button>
                    }
                </p>
                <hr />
            </div>
        );
    }

    render = () => {
        const { isAuth, visible } = this.state;

        if(!visible)
            return <Spinner animation="border"/>;

        else {
            if(!isAuth)
                return this.drawAuthForm();
            
            else
                return <ModifyInfoForm userId={this.props.userId}/>;
        }
    }
}

export default ModifyInfoPage;