import '@babel/polyfill';
import React, { Component } from 'react';
import { Badge } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import * as todoActions from '../../../store/modules/reducers/TodoActions'
import { connect } from 'react-redux';
import TodoDropDownBtnCotainer from './TodoDropDownBtn'
import DetailTodoModalContainer from './DetailTodoModal';
import DeleteTodoAlertContainer from './DeleteTodoAlert';

class TodoItem extends Component {

    constructor(props, context){
        super(props, context);
    }

    setDateToString = () => {
        const { date_y, date_m, date_d } = this.props.todo;
        let str = date_y + ".";

        if(date_m < 10) str += "0";
        str += date_m + ".";

        if(date_d < 10) str += "0";
        str += date_d;

        return str;
    }

    getBadgeColorByProgress = () => {
        switch(this.props.todo.progress){
            case "TODO":
                return "danger";
            case "DOING":
                return "primary";
            default:
                return "success";
        }
    }

    isSameUser = (id) => {
        return this.props.userId == id;
    }

    getDeleteButtonByUserId = (id, no) => {
        if(this.isSameUser(id))
            return <th><DeleteTodoAlertContainer no={no}/></th>;
        else return <th></th>
    }

    getTodoBadge = (id, privacy) => {
        if(!this.isSameUser(id)){
            return <Badge variant="info">Team</Badge>;
        } else if(privacy == "public"){
            return <Badge variant="primary">public</Badge>;
        } else { // privacy == 1
            return <Badge variant="secondary">private</Badge>;
        }
    }
    
    shouldComponentUpdate = (nextProps, nextState) => {
        return (nextProps !== this.props);
    }
    
    render = () => {
        const { todo } = this.props;

        return(
            <tr>
                <th><TodoDropDownBtnCotainer no={todo.no} 
                    progress={todo.progress} isEqual={this.isSameUser(todo.id)}/></th>
                <th>{todo.title + "  "}{this.getTodoBadge(todo.id, todo.privacy)}</th>
                <th>{todo.name}</th>
                <th>{this.setDateToString()}</th>
                <th>{todo.level}</th>
                <th><DetailTodoModalContainer todo={todo} isEqual={this.isSameUser(todo.id)}/></th>
                {this.getDeleteButtonByUserId(todo.id, todo.no)}
            </tr>
        );
    }
}

const TodoItemContainer = connect(
    (state) => ({
        todoList: state.todo.get('todoList')
    }),
    (dispatch) => ({
        TodoActions: bindActionCreators(todoActions, dispatch)
    })
)(TodoItem);

export default TodoItemContainer;