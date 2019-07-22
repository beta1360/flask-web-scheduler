import React, { Component } from 'react';
import { Navbar, Form, Nav, Button, FormControl } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import * as todoActions from '../../store/modules/reducers/TodoActions'
import { connect } from 'react-redux';
import LogoutBtn from './user/LogoutBtn';
import TodoHomeContainer from './TodoHome';

class MainHome extends Component {

    constructor(props, context){
        super(props, context);
    }

    render = () => {
        return (
            <div>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="#todo">Todo Scheduler</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#todo">Todo List</Nav.Link>
                        <Nav.Link href="#calendar">Calendar</Nav.Link>
                        <Nav.Link href="#groups">Groups</Nav.Link>
                        <Nav.Link href="#myinfo">My Info</Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <LogoutBtn />
                    </Navbar.Collapse>
                </Navbar>

                <TodoHomeContainer />
            </div>
        );
    }
}

const MainHomeContainer = connect(
    (state) => ({
        todoList: state.todo.get('todoList'),
    }),
    (dispatch) => ({
        TodoActions: bindActionCreators(todoActions, dispatch)
    })
)(MainHome);

export default MainHomeContainer;