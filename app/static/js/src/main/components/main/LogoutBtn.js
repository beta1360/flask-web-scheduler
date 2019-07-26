import '@babel/polyfill'
import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

class LogoutBtn extends Component {
    
    onClickLogoutBtn = () => {
        axios.post('http://localhost:13609/api/logout')
        .then( (response) =>{
            const message = response.data.message;
            alert(message);
            location.replace("http://localhost:13609");
        }).catch( (error) => {
            alert(error.data.message);
        });
    }

    render = () => {
        return(
            <div>
                <Button variant="outline-light" onClick={this.onClickLogoutBtn}>
                    로그아웃
                </Button>
            </div>
        );
    }
}

export default LogoutBtn;