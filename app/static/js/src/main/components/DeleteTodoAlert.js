import { Button } from 'react-bootstrap';
import React, { Component } from 'react';
import Axios from 'axios';

class DeleteTodoAlert extends Component {
    
    constructor(props, context){
        super(props, context);

        this.deleteTodo = this.deleteTodo.bind(this);

        this.state = {
            show: false
        };
    }

    deleteTodo(){
        if(confirm("Todo를 삭제하시겠습니까?")){
            Axios.delete("http://localhost:13609/todo/delete"
                , {params: {no: this.props.no}})
                .then((response)=>{
                    alert(response.data.message);
                    location.reload();
                });
        }
    }

    render(){
        return(
            <div>
                <Button variant="danger" onClick={this.deleteTodo}>삭제</Button>
            </div>
        );
    }
}

export default DeleteTodoAlert;