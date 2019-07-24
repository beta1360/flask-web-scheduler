import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

class DeleteInfoPage extends Component {

    render = () => {

        return (
            <Jumbotron>
                <h2><b>회원 탈퇴를 정말 하시겠습니까?</b></h2>
                <p>
                회원탈퇴를 하시면 기존의 개인 정보를 모두 지우고, 
                Todo에 대한 접근권한이 사라집니다. 
                그래도 회원 탈퇴를 하시겠습니까?
                </p>
                <p>
                    <Button variant="danger">회원 탈퇴</Button>
                </p>
            </Jumbotron>
        );
    }
}

export default DeleteInfoPage;