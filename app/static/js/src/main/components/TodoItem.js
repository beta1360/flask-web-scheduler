import '@babel/polyfill';
import React, { Component } from 'react';
import DetailTodoModal from './DetailTodoModal';
import DeleteTodoAlert from './DeleteTodoAlert';

class TodoItem extends Component {

    constructor(props, context){
        super(props, context);

        this.defaultProps = {
            todo: undefined,
            no: 0,
            name: 'None',
            title: '(제목 없음)',
            date_y: 2000,
            date_m: 1,
            date_d: 1,
            level: 0,
            id: ''
        };
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

    shouldComponentUpdate = (nextProps, nextState) => {
        return (nextProps.todo !== this.props.todo);
    }
    
    render = () => {
        return(
            <tr>
                <th>{this.props.todo.no}</th>
                <th>{this.props.todo.title}</th>
                <th>{this.props.todo.name}</th>
                <th>{this.setDateToString()}</th>
                <th>{this.props.todo.level}</th>
                <th><DetailTodoModal no={this.props.todo.no}/></th>
                <th><DeleteTodoAlert no={this.props.todo.no}/></th>
            </tr>
        );
    }
}

export default TodoItem;