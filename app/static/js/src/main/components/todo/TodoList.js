import '@babel/polyfill';
import React, { Component } from 'react';
import { List } from 'immutable';
import { Spinner } from 'react-bootstrap';
import TodoItemContainer from './TodoItem';
import { bindActionCreators } from 'redux';
import * as todoActions from '../../../store/modules/reducers/TodoActions'
import { connect } from 'react-redux';

class TodoList extends Component {

    constructor(props, context){
        super(props, context);

        this.defaultProps = {
            userId: '',
            range: 'all'
        }

        this.state = {
            visible: false,
            todoList: List([])
        }
    }

    handleToBeVisibleTodoTable = () => {
        this.setState({ visible: true });
    }

    handleToBeInvisibleTodoTable = () => {
        this.setState({ visible: false });
    }

    getTodoList = async () => {
        const { userId, TodoActions, range } = this.props;

        await TodoActions.getTodoList(userId, range);

        this.getStateFromProps();
    }

    getStateFromProps = () => {
        this.handleToBeInvisibleTodoTable();

        const { todoList } = this.props;
        this.setState({todoList: todoList})

        this.handleToBeVisibleTodoTable();
    }

    drawTodoTable = () => {
        const { todoList } = this.state;
        const { userId } = this.props;

        return todoList.map((todo) => {
            const todoComp = todo.toJS();
            return <TodoItemContainer todo={todoComp} 
                    key={todo.get("no")} userId={userId}/>
        });
    }

    componentDidMount = () =>{
        this.getTodoList();
    }

    componentDidUpdate = (prevProps, prevState) => {
        const { TodoActions, rerender } = this.props;
        const prevRerender = prevProps.rerender;
        const pending = prevProps.pending;

        if(prevRerender && !rerender && !pending
            || prevProps.range != this.props.range){
            this.getTodoList();
            TodoActions.todoRerender();
        }
    }

    render = () => {
        const { visible } = this.state;

        if(visible)
            return this.drawTodoTable();

        else 
            return <Spinner animation="border"/>;
    }
}

const TodoListContainer = connect(
    (state) => ({
        todoList: state.todo.get('todoList'),
        rerender: state.todo.get('rerender'),
        pending: state.todo.get('pending')
    }),
    (dispatch) => ({
        TodoActions: bindActionCreators(todoActions, dispatch)
    })
)(TodoList);

export default TodoListContainer;