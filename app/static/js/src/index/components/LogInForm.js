import '@babel/polyfill';
import React, { Component, Fragment } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import * as url from '../../config';
import axios from 'axios';

class LogInForm extends Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            show: false,
            id: '',
            pwd: '',
            onReadyLogin: true
        };
    }

    handleChangeID = (e) => {
        this.setState({id: e.target.value});
    }

    handleChangePwd = (e) => {
        this.setState({pwd: e.target.value});
    }

    handleClose = () => {
        this.setState({ show: false });
        this.initLogInForm;
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    disableLoginBtn = () => {
        this.setState({ onReadyLogin: false });
    }

    enableLoginBtn = () => {
        this.setState({ onReadyLogin: true });
    }

    onClickLogInBtn = async () => {
        const { id, pwd } = this.state;

        this.disableLoginBtn();

        if(id.length == 0 || pwd.length == 0)
            alert("id 혹은 비밀번호 칸을 채워주세요.");

        else {       
            const response = await axios.post(
                url.LOGIN_API_URL, {
                user_id: id, user_pw: pwd});

            this.getMessageByStatusCode(response);
        }

        this.enableLoginBtn();
    }

    getMessageByStatusCode = (response) => {
        const { code, message } = response.data;

        if(code == 200) {
            alert(message);
            location.replace(url.GET_MAIN_PAGE_URL);
        } 
        
        else if(code == 601)
            alert(message);

        else 
            alert("로그인 에러입니다.");
    }

    shouldComponentUpdate = (prevProps, prevState) => {
        return this.state !== prevState;
    }

    render = () => {
        const { onReadyLogin } = this.state;

        return (
            <Fragment>
                <div>
                    <Button variant="primary" onClick={this.handleShow}>
                        로그인
                    </Button>
                </div>

                <div>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>로그인</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>ID</Form.Label>
                                    <Form.Control type="text" placeholder="Enter ID" onChange={this.handleChangeID}/>
                                    <Form.Text className="text-muted">
                                        We'll never share your id with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>PW</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange={this.handleChangePwd}/>
                                </Form.Group>
                                {
                                    onReadyLogin?
                                    <Button variant="primary" onClick={this.onClickLogInBtn}>로그인</Button>
                                    : <Button variant="primary">로그인</Button>
                                }
                                <Button variant="secondary" onClick={this.handleClose}>
                                    취소
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </div>
            </Fragment>
        );
    }
}

export default LogInForm;