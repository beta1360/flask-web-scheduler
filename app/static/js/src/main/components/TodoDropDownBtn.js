import '@babel/polyfill';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import React, { Component } from 'react';

class TodoDropDownBtn extends Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            progress: this.props.progress
        }
    }

    handleToggleChange = (e) => {
        this.setState({ progress: e.target.value });
    }

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

export default TodoDropDownBtn;