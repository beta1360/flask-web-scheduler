import React, { Component, Fragment } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class WriteTodoBtn extends Component {
    
    constructor(context, props){
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state({
            show: false,
            startDate: moment()
        });
    }

    handleClose(){
        this.setState({ show: false });
    }

    handleShow(){
        this.setState({ show: true });
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    render(){
        return (
            <Fragment>
                <div>
                    <Button variant="primary" onClick={this.handleShow}>Primary</Button>
                </div>

                <div>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Todo 쓰기</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>제목</Form.Label>
                                <Form.Control type="text" placeholder="제목을 작성해주세요."/>
                            </Form.Group>

                                <Form.Group>
                                    <Form.Title>일정</Form.Title>
                                    <DatePicker
                                        selected={this.state.startDate}
                                        onChange={this.handleChange}/>                           
                                </Form.Group>

                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>내용</Form.Label>
                                <Form.Control as="textarea" rows="5" />
                            </Form.Group>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="primary">
                                작성완료
                            </Button>
                            <Button variant="secondary">
                                취소
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </Fragment>
        );
    }
}

export default WriteTodoBtn;