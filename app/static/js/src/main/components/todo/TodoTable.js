import '@babel/polyfill';
import React, { Component, Fragment } from 'react';
import { Table } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import * as todoActions from '../../../store/modules/reducers/TodoActions'
import { connect } from 'react-redux';

import WriteTodoBtnContainer from './WriteTodoBtn';
import TodoListContainer from './TodoList';
import TodoProgressBarContainer from './TodoProgressBar';

class TodoTable extends Component {

    constructor(props, context){
        super(props, context);
    }

    render = () => {
        const { userId, userName, groupNum, range } = this.props;

        return (
            <div>
                <hr />
                <TodoProgressBarContainer />
                <hr />
                <Fragment>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>진행상황</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>일정</th>
                                <th>우선순위</th>
                                <th>상세보기</th>
                                <th>삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TodoListContainer 
                                range={range} 
                                userId={userId} 
                                userName={userName} 
                                groupNum={groupNum}/>
                        </tbody>
                    </Table>
                    <hr />
                    <WriteTodoBtnContainer userId={userId}/>
                </Fragment>
            </div>
        );
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