import '@babel/polyfill'
import { Modal, Button } from 'react-bootstrap';
import React, { Component } from 'react';
import { Map } from 'immutable';
import DeleteTodoAlert from './DeleteTodoAlert'
import ModifyTodoModal from './ModifyTodoModal'
import axios from 'axios';

class DetailTodoModal extends Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            data: Map({
                name: '',
                title: '',
                date_y: '0000',
                date_m: 0,
                date_d: 0,
                body: '',
                level: 0
            }),
            show: false
        }

        this.defaultProps = {
            no: 0,
        };
    }

    showDetailTodo = async () => {
        const response = await axios.get('http://localhost:13609/todo/component'
                                        , {params: {no: this.props.no}});
        const todoComp  = response.data;
        const { data } = this.state;

        this.setState({
            data: data.merge({
                name: todoComp.name,
                title: todoComp.title,
                date_y: todoComp.date_y,
                date_m: todoComp.date_m,
                date_d: todoComp.date_d,
                body: todoComp.body,
                level: todoComp.level
            })
        });
    }

    handleClose = () => {
        this.setState({show: false});
    }

    handleShow = () => {
        this.setState({show: true});
    }

    setDateToString = () => {
        const date_y = this.state.data.get('date_y');
        const date_m = this.state.data.get('date_m');
        const date_d = this.state.data.get('date_d');

        let str = date_y + ".";

        if(date_m < 10) str += "0";
        str += date_m + ".";

        if(date_d < 10) str += "0";
        str += date_d;

        return str;
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return ( nextProps !== this.props
            || nextState !== this.state );
    }

    componentDidMount = () => {
        this.showDetailTodo();
    }

    render = () => {
        const { data } = this.state;

        return(
            <div>
                <Button variant="primary" onClick={this.handleShow}>상세보기</Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>#{this.props.no} <b>{data.get('title')}</b></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><label><b>우선 순위: </b> {data.get('level')}</label></p>
                        <p><label><b>해야될 날짜: </b> {this.setDateToString()}</label></p>
                        <p><label><b>상세 내용: </b></label></p>{data.get('title')}
                    </Modal.Body>
                    <Modal.Footer>
                        <ModifyTodoModal no={this.props.no} title={data.get('title')} 
                            startDate={this.setDateToString()} 
                            content={data.get('body')} level = {data.get('level')}/>
                        <DeleteTodoAlert no={this.props.no}/>
                        <Button variant="dark" onClick={this.handleClose}>닫기</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
};

export default DetailTodoModal;