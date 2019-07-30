import '@babel/polyfill';
import React from 'react'; 
import { Button, Form, Modal, ButtonGroup, OverlayTrigger } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { bindActionCreators } from 'redux';
import * as todoActions from '../../../store/modules/reducers/TodoActions'
import { connect } from 'react-redux';

class WriteTodoBtn extends React.Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            disable: true,
            show: false,
            title: '',
            startDate: '',
            content: '',
            level: '',
            isPrivate: false
        };
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    handleTitleChange = (e) => {
        this.setState({ title: e.target.value });
    }

    handleDateChange = (date) => {
        this.setState({ startDate: date });
    }

    handleContentChange = (e) => {
        this.setState({ content: e.target.value });
    }

    handleToggleChange = (e) => {
        this.setState({ level: e.target.value });
    }

    handleCheckBoxChange = (e) => {
        this.setState({ isPrivate: e.target.checked });
    }

    disableWriteTodoBtn = () => {
        this.setState({ disable: true });
    }

    enableWriteTodoBtn = () => {
        this.setState({ disable: false });
    }

    submitWritingTodoForm = async () => {
        this.disableWriteTodoBtn();

        const { TodoActions } = this.props;

        const thisDate = new Date(this.state.startDate);

        const date_y = Number(thisDate.getFullYear());
        const date_m = Number(thisDate.getMonth() + 1);
        const date_d = Number(thisDate.getDate());

        const title = this.state.title;
        const body = this.state.content;
        const level = Number(this.state.level);

        const privacy = this.state.isPrivate? "private": "public";

        await TodoActions.addTodo(title, date_y, date_m, date_d, body, level, privacy);
        TodoActions.todoRerender();

        this.handleClose();

        this.enableWriteTodoBtn();
    }

    getTooltip = () => {
        return (
            <div
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    padding: '2px 10px',
                    color: 'white',
                    borderRadius: 3,
            }}>
            Todo를 작성하시면, Todo 상태로 시작합니다.
          </div>
        );
    }

    render = () => {
        const { disable } = this.state;

        return (
            <div>
                <OverlayTrigger   
                    placement="top-start"
                    delay={{ show: 250, hide: 400 }}
                    overlay={this.getTooltip()}>
                    <Button variant="primary" onClick={this.handleShow}>Todo 추가</Button>
                </OverlayTrigger>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Todo 쓰기</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>제목</Form.Label>
                            <Form.Control type="text" placeholder="제목을 작성해주세요." onChange={this.handleTitleChange}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>일정</Form.Label>
                            <p>
                                <DatePicker
                                    dateFormat="yyyy.MM.dd"
                                    selected={this.state.startDate}
                                    onChange={this.handleDateChange}
                                    isClearable={true}
                                    placeholderText="Click to select a date"/>   
                            </p>                        
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>내용</Form.Label>
                            <Form.Control as="textarea" rows="5" onChange={this.handleContentChange}/>
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlButtonGroup">
                            <Form.Label>작업 우선순위</Form.Label>
                            <p>
                                <ButtonGroup aria-label="Basic example">
                                    <Button variant="danger" value='1' onClick={this.handleToggleChange}>1</Button>
                                    <Button variant="warning" value='2' onClick={this.handleToggleChange}>2</Button>
                                    <Button variant="success" value='3' onClick={this.handleToggleChange}>3</Button>
                                    <Button variant="info" value='4' onClick={this.handleToggleChange}>4</Button>
                                    <Button variant="secondary" value='5' onClick={this.handleToggleChange}>5</Button>
                                </ButtonGroup>
                            </p>
                        </Form.Group>
                        <Form.Group>
                            <Form.Check
                                custom="true"
                                label="비공개로 하실 거면, 체크를 해주세요."
                                onChange={this.handleCheckBoxChange}
                                id="validationFormik0"
                                />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        {
                            disable?
                            <Button variant="primary">작성완료</Button>
                            :<Button variant="primary" onClick={this.submitWritingTodoForm}>작성완료</Button>
                        }
                        <Button variant="secondary" onClick={this.handleClose}>
                            취소
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

const WriteTodoBtnContainer = connect(
    (state) => ({
        todoList: state.todo.get('todoList')
    }),
    (dispatch) => ({
        TodoActions: bindActionCreators(todoActions, dispatch)
    })
)(WriteTodoBtn);

export default WriteTodoBtnContainer;