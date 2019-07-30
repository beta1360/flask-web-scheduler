import '@babel/polyfill';
import React, { Component, Fragment } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import * as url from '../../config';
import axios from 'axios';

class SignUpForm extends Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            show: false,
            idPass: false,
            id: '',
            pw: '-',
            cpw: 'x',
            name: '',
            rank: '사원',
            groupCode: '',
            onReadyCheckId: true,
            onReadySignUp: true
        };
    }

    handleIdCheckPass = () => {
        this.setState({ idPass: true});
    }

    handleIdCheckNotPass = () => {
        this.setState({ idPass: false});
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    handleChangeId = (e) => {
        this.setState({id: e.target.value});
    }

    handleChangePw = (e) => {
        this.setState({pw: e.target.value});
    }

    handleChangeCpw = (e) => {
        this.setState({cpw: e.target.value});
    }

    handleChangeName = (e) => {
        this.setState({name: e.target.value});
    }

    handleChangeRank = (e) => {
        this.setState({rank: e.target.value});
    }

    handleGroupCode = (e) => {
        this.setState({groupCode: e.target.value});
    }

    disableCheckIdBtn = () => {
        this.setState({onReadyCheckId: false});
    }

    enableCheckIdBtn = () => {
        this.setState({onReadyCheckId: true});
    }

    disableSignUpBtn = () => {
        this.setState({onReadySignUp: false});
    }

    enableSignUpBtn = () => {
        this.setState({onReadySignUp: true});
    }

    onClickIdCheckBtn = async () => {
        this.disableCheckIdBtn();

        const response = await this.checkValidId();
        const { code, message } = response.data;

        let result = code != 200 ? true:false;
        this.setState({idPass: result});
        alert(message);

        this.enableCheckIdBtn();
    }

    checkValidId = () => axios.post(url.CHECK_ID_URL, {user_id: this.state.id} )

    isEqualPasswords = () => this.state.pw == this.state.cpw

    checkValidate = async () => {
        let isValidatedForm = false;
        const { id, pw, cpw, name } = this.state;

        if(id == ''  || pw == '' || cpw == '' || name == '')
            alert("회원가입 폼에 빈칸이 존재해선 안됩니다.");

        else if(!this.isEqualPasswords())
            alert("두 비밀번호가 다릅니다.");

        else { 
            const response = await this.checkValidId();
            const { code } = response.data;
            const { idPass } = this.state;

            if(code == 200 && idPass)
                isValidatedForm = true;
        }

        return isValidatedForm;
    }

    submitSignForm = async () => {
        this.disableSignUpBtn();

        const {id, pw, name, rank, groupCode } = this.state;

        if(this.checkValidate()){
            const response = await axios.post(url.ADD_USER_URL, {
                id: id,
                password: pw,
                name: name,
                rank: rank,
                group_code: groupCode
            });

            const { message } = response.data;
            alert(message);
            this.handleClose();
        }

        this.enableSignUpBtn();
    }

    shouldComponentUpdate = (prevProps, prevState) => {
        return this.state !== prevState;
    }

    render = () => {
        const { onReadyCheckId, onReadySignUp, show } = this.state;

        return (
            <Fragment>
                <div>
                    <Button variant="info" onClick={this.handleShow}>
                        회원가입
                    </Button>
                </div>

                <div>
                    <Modal show={show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>회원 가입</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>ID</Form.Label>
                                <Form.Control type="text" 
                                    placeholder="사용하실 아이디를 입력하세요." 
                                    onChange={this.handleChangeId}/>
                                {
                                    onReadyCheckId?
                                    <Button variant="info" 
                                        onClick={this.onClickIdCheckBtn}>중복 체크</Button>
                                    : <Button variant="info">중복 체크</Button>
                                }
                                <Form.Text className="text-muted">
                                    원하시는 ID를 입력하시고, 중복여부를 체크해주시길 바랍니다.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>PW</Form.Label>
                                <Form.Control type="password" 
                                    placeholder="사용하실 비밀번호를 입력하세요." 
                                    onChange={this.handleChangePw}/>
                                <Form.Text className="text-muted">
                                    { this.isEqualPasswords()? 
                                        "두 비밀번호가 같습니다. 다음 가입 절차를 진행해주세요."
                                        : "두 비밀번호가 다릅니다."
                                    }
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword2">
                                <Form.Label>PW 확인</Form.Label>
                                <Form.Control type="password" 
                                    placeholder="비밀번호를 한번 더 입력하세요." 
                                    onChange={this.handleChangeCpw}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicName">
                                <Form.Label>이름</Form.Label>
                                <Form.Control type="text" 
                                    placeholder="이름을 입력하세요." 
                                    onChange={this.handleChangeName}/>
                            </Form.Group>

                            <Form.Group controlId="formGridState">
                                <Form.Label>직급</Form.Label>
                                <Form.Control as="select" onChange={this.handleChangeRank}>
                                    <option>사원</option>
                                    <option>대리</option>
                                    <option>과장</option>
                                    <option>차장</option>
                                    <option>부장</option>
                                    <option>이사</option>
                                    <option>상무</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicGroup">
                                <Form.Label>그룹코드</Form.Label>
                                <Form.Control type="text" 
                                    placeholder="그룹코드를 입력하세요." 
                                    onChange={this.handleGroupCode}/>
                                <Form.Text className="text-muted">
                                    만약 존재하지 않는 그룹이면, 익명 그룹으로 분류됩니다.
                                </Form.Text>
                            </Form.Group>

                        </Modal.Body>
                        <Modal.Footer>
                            {
                                onReadySignUp?
                                <Button variant="primary" 
                                    onClick={this.submitSignForm}>회원가입</Button>
                                : <Button variant="primary">회원가입</Button>
                            }
                            <Button variant="secondary" onClick={this.handleClose}>
                                취소
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </Fragment>
        );
    }
}

export default SignUpForm;