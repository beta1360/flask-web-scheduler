import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import TodoItem from './TodoItem';

class TodoTable extends Component {
    constructor(props, context){
        super(props, context);

        this.getUserIDnName = this.getUserIDnName.bind(this);
        this.getTodoList = this.getTodoList.bind(this);

        this.state = {
            user_id: '',
            user_name: '',
            todoList: []
        };

        this.getUserIDnName()
        .then(()=>{
            this.getTodoList();
        });
    }

    getUserIDnName(){
        return Promise.resolve(
            axios.get('http://localhost:13609/user/whoami')
            .then((response)=>{
                this.setState({
                    user_id: response.data.user_id,
                    user_name: response.data.user_name
                });
            })
        );
    }

    getTodoList(){
        return Promise.resolve(
            axios.get('http://localhost:13609/todo/list', {
                params: {id: this.state.user_id}
            }).then((response)=> {
                let todos = response.data;
                const tmp  = this.state.todoList;

                this.setState({todoList: tmp.concat(todos["todos"])});
            })
        );
    }

    render(){
        const list = this.state.todoList.map(todo=>{
                        return <TodoItem no={todo["no"]} title={todo["title"]} name={todo["name"]}
                            date_y={todo["date_y"]} date_m={todo["date_m"]} 
                            date_d={todo["date_d"]} level={todo["level"]} key={todo["no"]}/>
                    });

        return(
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>no</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>우선순위</th>
                            <th> - </th>
                        </tr>
                    </thead>
                    <tbody>
                        { list }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default TodoTable;