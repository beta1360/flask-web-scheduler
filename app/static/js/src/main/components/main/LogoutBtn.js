import '@babel/polyfill'
import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import * as url from '../../../config';
import axios from 'axios';

class LogoutBtn extends Component {
    
    constructor(props, context){
        super(props, context);

        this.state = {
            disable: false
        }
    }

    disableLogoutBtn = () => {
        this.setState({ disable: true });
    }

    enableLogoutBtn = () => {
        this.setState({ disable: false });
    }

    onClickLogoutBtn = async () => {
        this.disableLogoutBtn();

        const response = await axios.post(url.LOGOUT_API_URL)
        
        const { message } = response.data;
        alert(message);
        location.replace(url.GET_INDEX_PAGE_URL);

        this.enableLogoutBtn();
    }

    render = () => {
        const { disable } = this.state;

        return(
            <div>
            {
                disable?
                <Button variant="outline-light">로그아웃</Button>
                :<Button variant="outline-light" 
                    onClick={this.onClickLogoutBtn}>로그아웃</Button>
            }
            </div>
        );
    }
}

export default LogoutBtn;