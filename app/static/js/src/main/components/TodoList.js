import '@babel/polyfill';
import React, { Component } from 'react';
import axios from 'axios';
import { List, Map } from 'immutable';
import { Spinner } from 'react-bootstrap';

import TodoItem from './TodoItem';

class TodoList extends Component {

    constructor(props, context){
        super(props, context);

        this.defaultProps = {
            userId: ''
        }

        this.state = {
            data: Map({
                todoList: List([]),
                visible: false
            })
        }
    }

    handleToBeVisibleTodoTable = () => {
        const { data } = this.state;
        this.setState({
            data: data.set('visible', true)
        });
    }

    handleToBeInvisibleTodoTable = () => {
        const { data } = this.state;
        this.setState({
            data: data.set('visible', false)
        });
    }

    getTodoList = async () => {
        this.handleToBeInvisibleTodoTable();

        const res = await axios.get('http://localhost:13609/todo/list', {
            params: {id: this.props.userId}});

        const todos = res.data.todos;
        const { data } = this.state;
        
        this.setState({
            data: data.set('todoList', List(
                todos.map(todo=>Map(todo))
            ))
        });

        this.handleToBeVisibleTodoTable();
    }

    drawTodoTable = () =>{
        const list = this.state.data.get('todoList');

        return list.map((todo) => {
            const todoComp = todo.toJS();
            return <TodoItem todo={todoComp} key={todo.get("no")}/>
        });
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return nextState !== this.state;
    }

    componentDidMount = () =>{
        this.getTodoList();
    }

    render = () => {
        let visible = this.state.data.get('visible');

        if(visible)
            return this.drawTodoTable();
            
        else 
            return <Spinner animation="border"/>;
    }
}

export default TodoList;