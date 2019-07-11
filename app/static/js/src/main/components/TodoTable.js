import '@babel/polyfill';
import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Table, Spinner } from 'react-bootstrap';
import { Map } from 'immutable';

import WriteTodoBtn from './WriteTodoBtn';
import TodoList from './TodoList';

class TodoTable extends Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            data: Map({
                userId: '',
                userName: '',
            })
        };
    }

    setUserInformation = async () => {
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
        this.setUserInformation();
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return (nextState !== this.state);
    }

    render = () => {
        if(this.state.data.get('userId')){
            return (
                <div>
                    <Fragment>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>no</th>
                                    <th>제목</th>
                                    <th>작성자</th>
                                    <th>작성일</th>
                                    <th>우선순위</th>
                                    <th>진행상황</th>
                                    <th>상세보기</th>
                                    <th>삭제</th>
                                </tr>
                            </thead>
                            <tbody>
                                <TodoList userId={this.state.data.get('userId')}/>
                            </tbody>
                        </Table>
                        <WriteTodoBtn/>
                    </Fragment>
                </div>
            );
        } else {
            return <Spinner animation="border" role="status"/>;
        }
    }
}

export default TodoTable;