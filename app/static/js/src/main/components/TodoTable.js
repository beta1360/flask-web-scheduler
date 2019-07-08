import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import TodoItem from './TodoItem';
import WriteTodoBtn from './WriteTodoBtn';

class TodoTable extends Component {

    constructor(props, context){
        super(props, context);

        this.getTodoList = this.getTodoList.bind(this);
        this.getUserInformation = this.getUserInformation.bind(this);

        this.state = {
            userId: '',
            userName: '',
            todoList: []
        };

        this.getUserInformation()
        .then(()=>{
            this.getTodoList()
        });
    }

    getTodoList(){
        return Promise.resolve(
            axios.get('http://localhost:13609/todo/list', {
                params: {id: this.state.userId}
            }).then((response)=> {
                let todos = response.data;
                const tmp  = this.state.todoList;

                this.setState({todoList: tmp.concat(todos["todos"])});
            })
        );
    }

    getUserInformation(){
        return Promise.resolve(
            axios.get('http://localhost:13609/user/whoami')
            .then((response)=>{
                this.setState({
                    userId: response.data.user_id,
                    userName: response.data.user_name
                });
            })
        );
    }

    render(){
        const list = this.state.todoList.map(todo=>{
                        return <TodoItem no={todo["no"]} title={todo["title"]} name={todo["name"]}
                            date_y={todo["date_y"]} date_m={todo["date_m"]} 
                            date_d={todo["date_d"]} level={todo["level"]} 
                            id={this.state.userId} key={todo["no"]}/>
                    });

        return (
            <div>
                <Fragment>
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
                    <WriteTodoBtn/>
                </Fragment>
            </div>
        );
    }
}

export default TodoTable;