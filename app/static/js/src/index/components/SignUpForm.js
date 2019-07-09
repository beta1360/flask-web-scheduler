import React, { Component, Fragment } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import axios from 'axios';

class SignUpForm extends Component {
    constructor(props, context){
        super(props, context);

        this.handleIdCheckPass = this.handleIdCheckPass.bind(this);
        this.handleIdCheckNotPass = this.handleIdCheckNotPass.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleChangeId = this.handleChangeId.bind(this);
        this.handleChangePw = this.handleChangePw.bind(this);
        this.handleChangeCpw = this.handleChangeCpw.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeRank = this.handleChangeRank.bind(this);
        this.onClickIdCheckBtn = this.onClickIdCheckBtn.bind(this);
        this.checkValidId = this.checkValidId.bind(this);
        this.isEqualPasswords = this.isEqualPasswords.bind(this);
        this.checkValidate = this.checkValidate.bind(this);
        this.submitSignForm = this.submitSignForm.bind(this);

        this.state = {
            show: false,
            idPass: false,
            id: '',
            pw: '-',
            cpw: 'x',
            name: '',
            rank: '사원',
        };
    }

    handleIdCheckPass(){
        this.setState({ idPass: true});
    }

    handleIdCheckNotPass(){
        this.setState({ idPass: false});
    }

    handleClose(){
        this.setState({ show: false });
    }

    handleShow(){
        this.setState({ show: true });
    }

    handleChangeId(event){
        this.setState({id: event.target.value});
        this.checkValidId;
    }

    handleChangePw(event){
        this.setState({pw: event.target.value});
    }

    handleChangeCpw(event){
        this.setState({cpw: event.target.value});
    }

    handleChangeName(event){
        this.setState({name: event.target.value});
    }

    handleChangeRank(event){
        this.setState({rank: event.target.value});
    }

    onClickIdCheckBtn(){
        this.checkValidId()
            .then((response)=>{
                let code = response.data.code;
                let message = response.data.message;

                this.setState({idPass: code});
                alert(message);
        });
    }

    checkValidId(){
        return Promise.resolve( 
            axios.post(
            'http://localhost:13609/user/check', 
            {user_id: this.state.id} ));
    }

    isEqualPasswords(){
        return (this.state.pw == this.state.cpw);
    }

    checkValidate(){
        let isValidatedForm = false;

        if(this.state.id == '' 
            || this.pw == '' || this.cpw == ''
            || this.name == '')
            alert("회원가입 폼에 빈칸이 존재해선 안됩니다.");

        else if(!this.isEqualPasswords())
            alert("두 비밀번호가 다릅니다.");

        else { 
            this.checkValidId;
            if(this.state.idPass)
                isValidatedForm = true;
        }

        return isValidatedForm;
    }

    submitSignForm(){
        if(this.checkValidate()){
            axios.post('http://localhost:13609/user/add', {
                id: this.state.id,
                password: this.state.pw,
                name: this.state.name,
                rank: this.state.rank
            }).then((response)=>{
                alert(response.data.message);
                this.handleClose();
            }).catch((error)=>{
                alert("에러:" + error);
            });
        } 
    }

    render(){
        return (
            <Fragment>
                <div>
                    <Button variant="info" onClick={this.handleShow}>
                        회원가입
                    </Button>
                </div>

                <div>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>회원 가입</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>ID</Form.Label>
                                <Form.Control type="text" placeholder="사용하실 아이디를 입력하세요." onChange={this.handleChangeId}/>
                                <Button variant="info" onClick={this.onClickIdCheckBtn}>중복 체크</Button>
                                <Form.Text className="text-muted">
                                    원하시는 ID를 입력하시고, 중복여부를 체크해주시길 바랍니다.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>PW</Form.Label>
                                <Form.Control type="password" placeholder="사용하실 비밀번호를 입력하세요." onChange={this.handleChangePw}/>
                                <Form.Text className="text-muted">
                                    { this.isEqualPasswords()
                                        ? "두 비밀번호가 같습니다. 다음 가입 절차를 진행해주세요."
                                        : "두 비밀번호가 다릅니다."
                                    }
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword2">
                                <Form.Label>PW 확인</Form.Label>
                                <Form.Control type="password" placeholder="비밀번호를 한번 더 입력하세요." onChange={this.handleChangeCpw}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicName">
                                <Form.Label>이름</Form.Label>
                                <Form.Control type="text" placeholder="이름을 입력하세요." onChange={this.handleChangeName}/>
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
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={this.submitSignForm}>
                                회원가입
                            </Button>
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