import React, { Component } from 'react';
import { Jumbotron, Button, Alert } from 'react-bootstrap';
import * as url from '../../../config';
import axios from 'axios';

class DeleteInfoPage extends Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            disable: false,
            alertShow: false,
            jumboShow: true
        }
    }

    handleAlertShow = () => {
        this.setState({alertShow: true});
    }

    handleAlertClose = () => {
        this.setState({alertShow: false});
    }

    handleJumboShow = () => {
        this.setState({jumboShow: true});
    }

    handleJumboClose = () => {
        this.setState({jumboShow: false});
    }

    disableDeleteInfoPage = () => {
        this.setState({ disable: true });
    }

    enableDeleteInfoPage = () => {
        this.setState({ disable: false });
    }

    onClickPopupDeleteAlert = () => {
        this.handleJumboClose();
        this.handleAlertShow();
    }

    onClickDismissDeleteInfoAlert = () => {
        this.handleAlertClose();
        this.handleJumboShow();
    }

    onClickInfoDeleteBtn = async () => {
        this.disableDeleteInfoPage();

        await axios.delete(url.DELETE_USER_URL);

        alert("회원 정보가 모두 삭제되었습니다.");
        location.href=url.GET_INDEX_PAGE_URL;

        this.enableDeleteInfoPage();
    }
    
    drawAlert = () => {
        const { disable } = this.state;

        return (
            <Alert show={this.state.alertShow} variant="danger">
                <Alert.Heading>정말로 회원탈퇴 하시겠습니까?</Alert.Heading>
                <p>
                    회원 탈퇴를 할 경우, 데이터를 복구할 수도 해주지도 않습니다.
                    그래도 하시겠습니까?
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={this.onClickDismissDeleteInfoAlert} variant="outline-danger">
                        아니오
                    </Button>
                    {
                        disable?
                        <Button variant="danger">네. 탈퇴하겠습니다.</Button>
                        :<Button onClick={this.onClickInfoDeleteBtn} variant="danger">네. 탈퇴하겠습니다.</Button>
                    }
                </div>
            </Alert> 
        );
    }

    drawJumboTron = () => (
        <Jumbotron>
            <h2><b>회원 탈퇴를 정말 하시겠습니까?</b></h2>
            <p>
            회원탈퇴를 하시면 기존의 개인 정보를 모두 지우고, 
            Todo에 대한 접근권한이 사라집니다. 
            그래도 회원 탈퇴를 하시겠습니까?
            </p>
            <p>
                <Button variant="danger" onClick={this.onClickPopupDeleteAlert}>회원 탈퇴</Button>
            </p>
        </Jumbotron>
    )

    render = () => {
        const { alertShow } = this.state;
        if(alertShow)
            return this.drawAlert();

        else
            return this.drawJumboTron();
    }
}

export default DeleteInfoPage;