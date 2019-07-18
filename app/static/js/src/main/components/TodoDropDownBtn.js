import '@babel/polyfill';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as todoActions from '../store/modules/reducers/TodoActions'
import { connect } from 'react-redux';

class TodoDropDownBtn extends Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            progress: this.props.progress
        }
    }

    handleToggleChange = (e) => {
        this.setState({ progress: e.target.value });
        this.changeToggledProgress(e.target.value);
    }

    changeToggledProgress = async (progress) => {
        const { TodoActions, no } = this.props;

        await TodoActions.modifyProgress(no, progress);
        TodoActions.todoRerender();
    }
/*
    componentDidUpdate = (prevProps, prevState) => {
        if(prevState.progress != this.state.progress){
            this.changeToggledProgress();
        }
    }

    shouldComponentUpdate = (nextProps, nextState) =>{
        return nextState.progress != this.state.progress;
    }
*/
    getColorByProgress = () => {
        switch(this.state.progress){
            case "TODO":
                return "danger";
            case "DOING":
                return "primary";
            default:
                return "success";
        }
    }

    render = () => {
        return (
            <DropdownButton variant={this.getColorByProgress()} title={this.state.progress} id="dropdown-item-button">
                <Dropdown.Item as="button" onClick={this.handleToggleChange} value="TODO">TODO</Dropdown.Item>
                <Dropdown.Item as="button" onClick={this.handleToggleChange} value="DOING">DOING</Dropdown.Item>
                <Dropdown.Item as="button" onClick={this.handleToggleChange} value="DONE">DONE</Dropdown.Item>
            </DropdownButton>
        );
    }
}

const TodoDropDownBtnContainer = connect(
    (state) => ({
        todoList: state.todo.get('todoList'),
        rerender: state.todo.get('rerender'),
        pending: state.todo.get('pending')
    }),
    (dispatch) => ({
        TodoActions: bindActionCreators(todoActions, dispatch)
    })
)(TodoDropDownBtn);

export default TodoDropDownBtnContainer;