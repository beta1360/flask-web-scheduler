import React, { Component, Fragment } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class LogInForm extends Component {
    constructor(props, context){
        super(props, context);

        this.handleChangeID = this.handleChangeID.bind(this);
        this.handleChangePwd = this.handleChangePwd.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.onClickLogInBtn = this.onClickLogInBtn.bind(this);
        this.getMessageByStatusCode = this.getMessageByStatusCode.bind(this);
        this.initLogInForm = this.initLogInForm.bind(this);

        this.state = {
            show: false,
            id: '',
            pwd: ''
        };
    }

    handleChangeID(event){
        this.setState({id: event.target.value});
    }

    handleChangePwd(event){
        this.setState({pwd: event.target.value});
    }

    handleClose(){
        this.setState({ show: false });
        this.initLogInForm;
    }

    handleShow(){
        this.setState({ show: true });
    }

    onClickLogInBtn(){
        let loginId = this.state.id;
        let loginPwd = this.state.pwd;

        if(loginId.length == 0 || loginPwd.length == 0)
            alert("Please input user id or password in this boxes.");

        else {       
            axios.post('http://localhost:13609/api/login', {
                user_id: loginId,
                user_pw: loginPwd
            }).then( (response) =>{
                this.getMessageByStatusCode(response);
            }).catch( (error) => {
                alert("로그인 에러입니다.\n" + error.message);
            });
                
        }
    }

    getMessageByStatusCode(response){
        let status_code = response.data.code;
        let message = response.data.message;

        if(status_code == 200) {
            alert(message);
            this.initLogInForm;
            location.replace("http://localhost:13609/main");
        } else if(status_code == 601)
            alert(message);
        else 
            alert("로그인 에러입니다.");
    }

    initLogInForm(){
        this.setState({id: '', pwd: ''});
        this.handleClose;
    }

    render(){
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

                                <Button variant="primary" onClick={this.onClickLogInBtn}>
                                    로그인
                                </Button>
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