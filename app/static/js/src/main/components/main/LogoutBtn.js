import '@babel/polyfill'
import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import * as url from '../../../config';
import axios from 'axios';

class LogoutBtn extends Component {
    
    onClickLogoutBtn = () => {
        axios.post(url.LOGOUT_API_URL)
        .then( (response) =>{
            const message = response.data.message;
            alert(message);
            location.replace(url.GET_INDEX_PAGE_URL);
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