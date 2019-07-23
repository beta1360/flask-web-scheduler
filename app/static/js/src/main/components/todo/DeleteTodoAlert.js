import '@babel/polyfill'
import { Button } from 'react-bootstrap';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as todoActions from '../../../store/modules/reducers/TodoActions'
import { connect } from 'react-redux';

class DeleteTodoAlert extends Component {
    
    constructor(props, context){
        super(props, context);

        this.state = {
            show: false
        };
    }

    deleteTodo = async () => {
        const { TodoActions } = this.props;

        await TodoActions.deleteTodo(this.props.no);
        TodoActions.todoRerender();
    }

    render = () => {
        return(
            <Button variant="danger" onClick={this.deleteTodo}>삭제</Button>
        );
    }
}

const DeleteTodoAlertContainer = connect(
    (state) => ({
        todoList: state.todo.get('todoList')
    }),
    (dispatch) => ({
        TodoActions: bindActionCreators(todoActions, dispatch)
    })
)(DeleteTodoAlert);

export default DeleteTodoAlertContainer;