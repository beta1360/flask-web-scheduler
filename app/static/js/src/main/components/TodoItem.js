import '@babel/polyfill';
import React, { Component } from 'react';
import { Badge } from 'react-bootstrap';
import DetailTodoModal from './DetailTodoModal';
import DeleteTodoAlert from './DeleteTodoAlert';

class TodoItem extends Component {

    constructor(props, context){
        super(props, context);
    }

    setDateToString = () => {
        let date_y = this.props.todo.date_y;
        let date_m = this.props.todo.date_m;
        let date_d = this.props.todo.date_d;

        let str = date_y + ".";

        if(date_m < 10) str += "0";
        str += date_m + ".";

        if(date_d < 10) str += "0";
        str += date_d;

        return str;
    }

    getBadgeColorByProgress = () => {
        switch(this.props.progress){
            case "TODO":
                return "danger";
            case "DOING":
                return "primary";
            default:
                return "success";
        }
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return (nextProps !== this.props);
    }
    
    render = () => {
        const todo = this.props.todo;

        return(
            <tr>
                <th>{todo.no}</th>
                <th>{todo.title}</th>
                <th>{todo.name}</th>
                <th>{this.setDateToString()}</th>
                <th>{todo.level}</th>
                <th>
                    <Badge variant={this.getBadgeColorByProgress()}>
                        {todo.progress}
                    </Badge>
                </th>
                <th><DetailTodoModal todo={todo}/></th>
                <th><DeleteTodoAlert no={todo.no}/></th>
            </tr>
        );
    }
}

export default TodoItem;