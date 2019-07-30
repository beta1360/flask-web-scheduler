import '@babel/polyfill';
import { DropdownButton, Dropdown, Button, OverlayTrigger } from 'react-bootstrap';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as todoActions from '../../../store/modules/reducers/TodoActions'
import { connect } from 'react-redux';

class TodoDropDownBtn extends Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            progress: this.props.progress
        }
    }

    handleToggleChange = (e) => {
        const nextValue = e.target.value;
        const { progress } = this.state;

        if(nextValue != progress){
            this.setState({ progress: e.target.value });
            this.changeToggledProgress(e.target.value);
        }
    }

    changeToggledProgress = async (progress) => {
        const { TodoActions, no } = this.props;

        await TodoActions.modifyProgress(no, progress);
        TodoActions.todoRerender();
    }

    getColorByProgress = () => {
        const { progress } = this.state;

        switch(progress){
            case "TODO":
                return "danger";
            case "DOING":
                return "primary";
            default:
                return "success";
        }
    }

    getTooltip = () => {
        return (
            <div
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    padding: '2px 10px',
                    color: 'white',
                    borderRadius: 3,
            }}>
            다른 유저/팀원의 Todo의 진행상황은 수정이 불가능합니다.
          </div>
        );
    }

    render = () => {
        if(this.props.isEqual)
            return (
                <DropdownButton variant={this.getColorByProgress()} title={this.state.progress} id="dropdown-item-button">
                    <Dropdown.Item as="button" onClick={this.handleToggleChange} value="TODO">TODO</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.handleToggleChange} value="DOING">DOING</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.handleToggleChange} value="DONE">DONE</Dropdown.Item>
                </DropdownButton>
            );
        else
            return (
                <OverlayTrigger   
                    placement="top-start"
                    delay={{ show: 250, hide: 400 }}
                    overlay={this.getTooltip()}>
                    <Button variant={this.getColorByProgress()}>{this.state.progress}</Button>
                </OverlayTrigger> 
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