import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import * as todoActions from '../../store/modules/reducers/TodoActions'
import { connect } from 'react-redux';
import TodoTableContainer from './todo/TodoTable';

class TodoHome extends Component {
    
    constructor(props, context){
        super(props, context);

        this.state = {
            selected: 'all'
        }

    }

    onSelectedNavItem = (eventKey) => {
        this.setState({selected: eventKey});
    }

    getMyTodoNavTab = (groupNum) => {
        if(groupNum != 1){
            return (
                <Nav.Item>
                    <Nav.Link eventKey="my" href="#MyTodo" 
                        onSelect={this.onSelectedNavItem}>나의 Todo</Nav.Link>
                </Nav.Item>
            );
        } else {
            return <></>;
        }
    }

    getTeamTodoNavTab = (groupNum) => {
        if(groupNum != 1){
            return (
                <Nav.Item>
                    <Nav.Link eventKey="team" href="#TeamTodo" 
                        onSelect={this.onSelectedNavItem}> 팀원</Nav.Link>
                </Nav.Item>
            );
        } else {
            return <></>;
        }
    }


    shouldComponentUpdate = (nextProps, nextState) => {
        return this.state.selected !== nextState.selected;
    }

    render = () => {
        const { selected } = this.state;
        const { groupNum, userId, userName } = this.props;

        return (
            <div>
                <hr />
                <Nav variant="tabs" defaultActiveKey="#AllTodo">
                    <Nav.Item>
                        <Nav.Link eventKey="all" href="#AllTodo" onSelect={this.onSelectedNavItem}>전체</Nav.Link>
                    </Nav.Item>
                    {this.getMyTodoNavTab(groupNum)}
                    {this.getTeamTodoNavTab(groupNum)}
                </Nav>
                <TodoTableContainer range={selected} userId={userId} userName={userName} groupNum={groupNum}/>
            </div>
        );
    }
}

const TodoHomeContainer = connect(
    (state) => ({
        todoList: state.todo.get('todoList'),
    }),
    (dispatch) => ({
        TodoActions: bindActionCreators(todoActions, dispatch)
    })
)(TodoHome);

export default TodoHomeContainer;