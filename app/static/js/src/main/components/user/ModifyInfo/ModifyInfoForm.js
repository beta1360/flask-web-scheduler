import React, { Component } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

class ModifyInfoForm extends Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            visible: false,
            name: '',
            pwd: '',
            cpwd: '',
            rank: ''
        }
    }

    showForm = () => {
        this.setState({visible: true});
    }
    
    loadingForm = () => {
        this.setState({visible: false});
    }

    onChangeNameInput = (e) => {
        this.setState({name: e.target.value});
    }

    onChangePwdInput = (e) => {
        this.setState({pwd: e.target.value});
    }

    onChangeCpwdInput = (e) => {
        this.setState({cpwd: e.target.value});
    }

    onSelectedRank = (e) => {
        this.setState({rank: e.target.value});
    }

    isEqualPwdAndCpwd = () => {
        const { pwd, cpwd } = this.state;
        return pwd == cpwd;
    }

    onClickSubmitModifyBtn = async () => {
        const { name, rank, pwd } = this.state;

        if(this.isEqualPwdAndCpwd()){
            await axios.post('http://localhost:13609/user/modify', {
                name: name,
                password: pwd,
                rank: rank
            })

            if(pwd == ''){
                alert("개인 정보가 수정되었습니다.");
                location.reload();
            } else {
                alert('개인 정보가 수정되었습니다. 다시 로그인해주세요.');
                await axios.post('http://localhost:13609/api/logout');
                location.href = "http://localhost:13609";
            }
        }
        else
            alert("두 비밀번호가 다릅니다. 확인해주세요.");
    }

    recieveUserInfo = async () => {
        this.loadingForm();

        const response = await axios.get('http://localhost:13609/info/form');

        const { name, rank } = response.data;
        this.setState({
            name: name,
            rank: rank
        })

        this.showForm();
    }

    drawModifyInfoForm = () => (
        <div>
            <Form.Group controlId="formBasicID">
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" value={this.props.userId} disabled='true'/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>PW</Form.Label>
                <Form.Control type="password" placeholder="사용하실 비밀번호를 입력하세요." onChange={this.onChangePwdInput}/>
                <Form.Text className="text-muted">
                    { this.isEqualPwdAndCpwd()
                            ? "두 비밀번호가 같습니다. 다음 가입 절차를 진행해주세요."
                            : "두 비밀번호가 다릅니다."
                    }
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword2">
                <Form.Label>PW 확인</Form.Label>
                <Form.Control type="password" placeholder="비밀번호를 한번 더 입력하세요." onChange={this.onChangeCpwdInput}/>
            </Form.Group>

            <Form.Group controlId="formBasicName">
                <Form.Label>이름</Form.Label>
                <Form.Control type="text" placeholder="이름을 입력하세요." value={this.state.name} onChange={this.onChangeNameInput}/>
            </Form.Group>

            <Form.Group controlId="formGridState">
                <Form.Label>직급</Form.Label>
                <Form.Control as="select" onChange={this.onSelectedRank}>
                    <option>사원</option>
                    <option>대리</option>
                    <option>과장</option>
                    <option>차장</option>
                    <option>부장</option>
                    <option>이사</option>
                    <option>상무</option>
                </Form.Control>
            </Form.Group>

            <Button variant="info" onClick={this.onClickSubmitModifyBtn}>수정하기</Button>
        </div>
    )

    componentDidMount = () => {
        this.recieveUserInfo();
    }

    render = () => {
        const { visible } = this.state;

        if(visible)
            return this.drawModifyInfoForm();
        else
            return <Spinner animation="border" />;
    }
}

export default ModifyInfoForm;