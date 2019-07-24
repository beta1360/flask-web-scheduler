import '@babel/polyfill';
import React, { Component } from 'react';
import { Button, Form, Table, Spinner } from 'react-bootstrap';
import EnterGroupBtnContainer from './EnterGroupBtn';
import { bindActionCreators } from 'redux';
import * as groupActions from '../../../store/modules/reducers/GroupActions'
import { connect } from 'react-redux';
import axios from 'axios';

class SearchGroupLabel extends Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            updated: false,
            loading: false,
            groupInfoVisible: false,
            inputGroupCode: '',
            groupCode: '',
            groupNum: 0,
            groupName: ''
        }
    }
    
    showGroupInfo = () => {
        this.setState({groupInfoVisible: true});
    }

    unshowGroupInfo = () => {
        this.setState({groupInfoVisible: false});
    }

    onLoading = () => {
        this.setState({loading: true});
    }

    unLoading = () => {
        this.setState({loading: false});
    }

    onChangeGroupCodeForm = (e) => {
        this.setState({inputGroupCode: e.target.value});
    }

    getGroupInformation = (groupCode) => {
        return axios.post('http://localhost:13609/group/info',{
            group_code: groupCode
        });
    }

    findGroup = async () => {
        this.setState({updated: true});
        this.unshowGroupInfo();
        this.onLoading();

        const { inputGroupCode } = this.state;

        const response = await this.getGroupInformation(inputGroupCode);
        const { group } = response.data;

        if(group != 1){
            const { group_num, group_name } = group;
            const groupNum = group_num;
            const groupName = group_name;
            const groupCode = inputGroupCode;

            this.setState({
                groupNum: groupNum,
                groupCode: groupCode,
                groupName: groupName
            });
            this.showGroupInfo();
        }

        this.unLoading();
    }

    getGroupInfo = (groupInfoVisible) => {
        const { groupNum, groupCode, groupName, loading, updated } = this.state;

        if(groupInfoVisible && !loading && updated){
            return (
                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <th>{groupNum}</th>
                            <th>{groupName}</th>
                            <th><Button variant="outline-primary">상세보기</Button></th>
                            <th><EnterGroupBtnContainer groupCode={groupCode} groupName={groupName}/></th>
                        </tr>
                    </tbody>
                </Table>
            );
        } else if(!loading && !groupInfoVisible && updated){
            return <div>검색된 그룹이 없습니다.</div>;
        }
        else if(loading && updated){
            return <Spinner animation="border"/>;
        }
        else
            return <></>;
    }

    getSearchGroupForm = () => {
        const { groupNum } = this.props;
        const { groupInfoVisible } = this.state;

        if(groupNum != 1)
            return <></>;
         
        else {
            return (
                <div>
                    <Form.Group controlId="formBasicGroupCode">
                        <Form.Label><b>그룹 코드</b></Form.Label>
                        <Form.Control type="text" 
                            placeholder="그룹 코드를 입력해주세요." 
                            onChange={this.onChangeGroupCodeForm}/>
                    </Form.Group>
                    {this.getGroupInfo(groupInfoVisible)}
                    <Button variant="info" onClick={this.findGroup}>찾기</Button>
                </div>
            )
        }
    }

    render = () => {
        return this.getSearchGroupForm();
    }
}

const SearchGroupLabelContainer = connect(
    (state) => ({
        groupList: state.group.get('groupList'),
        message: state.group.get('message'),
        pending: state.group.get('pending'),
        rerender: state.group.get('rerender'),
    }),
    (dispatch) => ({
        GroupActions: bindActionCreators(groupActions, dispatch)
    })
)(SearchGroupLabel);

export default SearchGroupLabelContainer;