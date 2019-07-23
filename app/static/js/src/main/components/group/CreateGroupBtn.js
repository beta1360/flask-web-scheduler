import '@babel/polyfill';
import React, { Component } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import * as groupActions from '../../../store/modules/reducers/GroupActions'
import { connect } from 'react-redux';

class CreateGroupBtn extends Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            show: false,
            groupName: '',
            groupCode: ''
        }
    }

    handleShow = () =>{
        this.setState({show: true});
    }

    handleClose = () =>{
        this.setState({show: false});
    }

    handleGroupNameChange = (e) => {
        this.setState({groupName: e.target.value});
    }

    handleGroupCodeChange = (e) => {
        this.setState({groupCode: e.target.value});
    }

    onClickCheckingGroupCode = async () => {
        const { GroupActions, message } = this.props;
        const { groupCode } = this.state;
        await GroupActions.checkGroup(groupCode);
        
        alert(message);
    }

    onCreateGroup = async () => {
        const { GroupActions } = this.props;
        const { groupName, groupCode } = this.state;

        await GroupActions.addGroup(groupCode, groupName);
        const { message, statusCode } = this.props;
        
        if(statusCode == 200){
            alert(message);
            location.reload();
        } else
            alert(message);
    }

    render = () => {
        const { show } = this.state;

        return (
            <div>
                <Button variant="success" onClick={this.handleShow}>그룹 생성</Button>

                <Modal show={show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>그룹 생성하기</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>그룹명</Form.Label>
                            <Form.Control type="text" placeholder="그룹명을 작성해주세요." onChange={this.handleGroupNameChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicName">
                            <Form.Label>그룹코드</Form.Label>
                            <Form.Control type="text" placeholder="그룹 코드를 작성해주세요." onChange={this.handleGroupCodeChange}/>
                            <Form.Text className="text-muted">
                                이 코드를 통해서 private 그룹으로도 접근이 가능합니다.
                                중복되지 않는 코드를 작성해주세요.
                            </Form.Text>
                        </Form.Group>

                        <Button variant="success" onClick={this.onClickCheckingGroupCode}>그룹 코드 중복 체크</Button>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" onClick={this.onCreateGroup}>
                            그룹 생성
                        </Button>
                        <Button variant="secondary" onClick={this.handleClose}>
                            취소
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

const CreateGroupBtnContainer = connect(
    (state) => ({
        groupList: state.group.get('groupList'),
        message: state.group.get('message'),
        statusCode: state.group.get('statusCode'),
        pending: state.group.get('pending'),
        rerender: state.group.get('rerender'),
    }),
    (dispatch) => ({
        GroupActions: bindActionCreators(groupActions, dispatch)
    })
)(CreateGroupBtn);

export default CreateGroupBtnContainer;