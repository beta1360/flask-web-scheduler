import '@babel/polyfill';
import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Table, Spinner } from 'react-bootstrap';
import { Map } from 'immutable';
import { bindActionCreators } from 'redux';
import * as todoActions from '../store/modules/reducers/TodoActions'
import { connect } from 'react-redux';

import WriteTodoBtnContainer from './WriteTodoBtn';
import TodoListContainer from './TodoList';
import TodoProgressBarContainer from './TodoProgressBar';

class TodoTable extends Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            data: Map({
                userId: '',
                userName: ''
            })
        };
    }

    setTodoTableInformation = async () => {
        const res = await axios.get('http://localhost:13609/user/whoami');
                
        const userId = res.data.user_id;
        const userName = res.data.user_name;
        const { data } = this.state;

        this.setState({
            data: data.set('userId', userId)
                    .set('userName', userName)
        });
    }

    componentDidMount = () => {
        this.setTodoTableInformation();
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return (nextState !== this.state)
                || ( nextProps !== this.props );
    }

    render = () => {
        const userId = this.state.data.get('userId');

        if(userId){
            return (
                <div>
                    <TodoProgressBarContainer />

                    <Fragment>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>진행상황</th>
                                    <th>제목</th>
                                    <th>작성자</th>
                                    <th>작성일</th>
                                    <th>우선순위</th>
                                    <th>상세보기</th>
                                    <th>삭제</th>
                                </tr>
                            </thead>
                            <tbody>
                                <TodoListContainer userId={userId}/>
                            </tbody>
                        </Table>
                        <WriteTodoBtnContainer userId={userId}/>
                    </Fragment>
                </div>
            );
        } else {
            return <Spinner animation="border" role="status"/>;
        }
    }
}

const TodoTableContainer = connect(
    (state) => ({
        todoList: state.todo.get('todoList')
    }),
    (dispatch) => ({
        TodoActions: bindActionCreators(todoActions, dispatch)
    })
)(TodoTable);

export default TodoTableContainer;