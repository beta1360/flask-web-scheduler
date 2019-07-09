import { Modal, Button } from 'react-bootstrap';
import React, { Component } from 'react';
import DeleteTodoAlert from './DeleteTodoAlert'
import ModifyTodoModal from './ModifyTodoModal'

import axios from 'axios';

class DetailTodoModal extends Component {
    constructor(props, context){
        super(props, context);

        this.state = {
            show: false,
            name: 'None',
            title: '(제목 없음)',
            date_y: 2000,
            date_m: 1,
            date_d: 1,
            body: '',
            level: 0
        }

        this.defaultProps = {
            no: 0,
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.showDetailTodo = this.showDetailTodo.bind(this);
    }

    showDetailTodo(){
        axios.get('http://localhost:13609/todo/component', {
                params: {no: this.props.no}
            }).then((response)=>{
                const todoComp = response.data;

                this.setState({
                    name: todoComp.name,
                    title: todoComp.title,
                    date_y: todoComp.date_y,
                    date_m: todoComp.date_m,
                    date_d: todoComp.date_d,
                    body: todoComp.body,
                    level: todoComp.level
                });
                this.handleShow();
            });
        
    }

    handleClose(){
        this.setState({show: false});
    }

    handleShow(){
        this.setState({show: true});
    }

    render(){
        return(
            <div>
                <Button variant="primary" onClick={this.showDetailTodo}>상세보기</Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>#{this.props.no} <b>{this.state.title}</b></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><label><b>우선 순위: </b> {this.state.level}</label></p>
                        <p><label><b>해야될 날짜: </b></label></p>
                            {this.state.date_y}.{this.state.date_m}.{this.state.date_d}
                        <p><label><b>상세 내용: </b></label></p>
                        {this.state.body}
                    </Modal.Body>
                    <Modal.Footer>
                        <ModifyTodoModal no={this.props.no} title={this.state.title} 
                            startDate={this.state.date_y + "." + this.state.date_m + "." + this.state.date_d} 
                            content={this.state.body} level = {this.state.level}/>
                        <DeleteTodoAlert no={this.props.no}/>
                        <Button variant="dark" onClick={this.handleClose}>닫기</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
};

export default DetailTodoModal;