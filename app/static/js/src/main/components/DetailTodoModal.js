import { Modal, Button, Badge } from 'react-bootstrap';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as todoActions from '../store/modules/reducers/TodoActions'
import { connect } from 'react-redux';
import DeleteTodoAlertContainer from './DeleteTodoAlert'
import ModifyTodoModalContainer from './ModifyTodoModal'

class DetailTodoModal extends Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            show: false
        }

        this.defaultProps = {
            todo: undefined
        };
    }

    handleClose = () => {
        this.setState({show: false});
    }

    handleShow = () => {
        this.setState({show: true});
    }

    setDateToString = () => {
        const date_y = this.props.todo.date_y;
        const date_m = this.props.todo.date_m;
        const date_d = this.props.todo.date_d;

        let str = date_y + ".";

        if(date_m < 10) str += "0";
        str += date_m + ".";

        if(date_d < 10) str += "0";
        str += date_d;

        return str;
    }

    getBadgeColorByProgress = () => {
        switch(this.props.todo.progress){
            case "TODO":
                return "danger";
            case "DOING":
                return "primary";
            default:
                return "success";
        }
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return ( nextProps !== this.props
            || nextState !== this.state );
    }

    render = () => {
        const { todo } = this.props;

        return(
            <div>
                <Button variant="primary" onClick={this.handleShow}>상세보기</Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <Badge variant={this.getBadgeColorByProgress()}>{todo.progress}</Badge>#{todo.no} <b>{todo.title}</b>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><label><b>우선 순위: </b> {todo.level}</label></p>
                        <p><label><b>해야될 날짜: </b> {this.setDateToString()}</label></p>
                        <p><label><b>상세 내용: </b></label></p>{todo.body}
                    </Modal.Body>
                    <Modal.Footer>
                        <ModifyTodoModalContainer no={todo.no} title={todo.title} 
                            startDate={this.setDateToString()} 
                            content={todo.body} level = {todo.level}
                            progress={todo.progress}/>
                        <DeleteTodoAlertContainer no={todo.no}/>
                        <Button variant="dark" onClick={this.handleClose}>닫기</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
};

const DetailTodoModalContainer = connect(
    (state) => ({
        todoList: state.todo.get('todoList'),
    }),
    (dispatch) => ({
        TodoActions: bindActionCreators(todoActions, dispatch)
    })
)(DetailTodoModal);

export default DetailTodoModalContainer;