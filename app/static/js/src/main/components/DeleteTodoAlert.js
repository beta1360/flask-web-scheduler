import '@babel/polyfill'
import { Button } from 'react-bootstrap';
import React, { Component } from 'react';
import Axios from 'axios';

class DeleteTodoAlert extends Component {
    
    constructor(props, context){
        super(props, context);

        this.state = {
            show: false
        };
    }

    deleteTodo = async () => {
        if(confirm("Todo를 삭제하시겠습니까?")){
            const response = await Axios.delete("http://localhost:13609/todo/delete"
                                , {params: {no: this.props.no}});
                    
            alert(response.data.message);
            //location.reload();
        }
    }

    render = () => {
        return(
            <Button variant="danger" onClick={this.deleteTodo}>삭제</Button>
        );
    }
}

export default DeleteTodoAlert;