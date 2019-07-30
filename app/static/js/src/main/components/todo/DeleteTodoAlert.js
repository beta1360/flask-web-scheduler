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
            disable: false,
            show: false
        };
    }

    disableDeleteTodoBtn = () => {
        this.setState({disable: true});
    }

    enableDeleteTodoBtn = () => {
        this.setState({disable: false});
    }

    deleteTodo = async () => {
        this.disableDeleteTodoBtn();

        const { TodoActions } = this.props;

        await TodoActions.deleteTodo(this.props.no);
        TodoActions.todoRerender();

        this.enableDeleteTodoBtn();
    }

    render = () => {
        const { disable } = this.state;

        if(disable)
            return <Button variant="danger">삭제</Button>

        else
            return <Button variant="danger" onClick={this.deleteTodo}>삭제</Button>;
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