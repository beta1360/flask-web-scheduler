import '@babel/polyfill';
import { Button, Modal, ButtonGroup, Form, ToggleButtonGroup } from 'react-bootstrap';
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { bindActionCreators } from 'redux';
import * as todoActions from '../../../store/modules/reducers/TodoActions'
import { connect } from 'react-redux';

class ModifyTodoModal extends Component {

    constructor(props, context){
        super(props, context);

        this.defaultProps = {
            no: '',
            title: '',
            startDate: '',
            content: '',
            level: ''
        }

        const { title, startDate, content, level, progress, privacy } = this.props;

        this.state = {
            disable: false,
            show: false,
            title: title,
            startDate: startDate,
            content: content,
            level: level,
            progress: progress,
            privacy: privacy
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
        this.setState({ privacy: e.target.checked?"private":"public" });
    }

    disableModifyTodoBtn = () => {
        this.setState({ disable: true });
    }

    enableModifyTodoBtn = () => {
        this.setState({ disable: false});
    }

    submitModifyingTodoForm = async () => {
        this.disableModifyTodoBtn();

        const { TodoActions } = this.props;
        const { startDate, title, content, progress, privacy, level } = this.state;
        const thisDate = new Date(startDate);

        const date_y = Number(thisDate.getFullYear());
        const date_m = Number(thisDate.getMonth() + 1);
        const date_d = Number(thisDate.getDate());

        const nLevel = Number(level);

        await TodoActions.modifyTodo(this.props.no, title, 
                    date_y, date_m, date_d, content, nLevel, progress, privacy);

        TodoActions.todoRerender();
        this.handleClose();

        this.enableModifyTodoBtn();
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return ( nextProps !== this.props
            || nextState !== this.state );
    }

    render = () => {
        const { no } = this.props;
        const { disable, show, title, startDate, content, privacy } = this.state;

        return (
            <div>
                <Button variant="primary" onClick={this.handleShow}>수정</Button>

                <Modal show={show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Todo#{no} 수정하기</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>제목</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="제목을 작성해주세요." 
                                onChange={this.handleTitleChange} 
                                value={title}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>일정</Form.Label>
                            <p>
                                <DatePicker
                                    dateFormat="yyyy/MM/dd"
                                    selected={startDate}
                                    onChange={this.handleDateChange}
                                    isClearable={true}
                                    placeholderText={startDate}/>   
                            </p>                        
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>내용</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows="5" 
                                onChange={this.handleContentChange} 
                                value={content}/>
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlButtonGroup">
                            <Form.Label>작업 우선순위</Form.Label>
                            <p>
                                <ButtonGroup aria-label="Basic example" toggle="true">
                                    <Button variant="danger" value='1' 
                                        onClick={this.handleToggleChange}>1</Button>
                                    <Button variant="warning" value='2' 
                                        onClick={this.handleToggleChange}>2</Button>
                                    <Button variant="success" value='3' 
                                        onClick={this.handleToggleChange}>3</Button>
                                    <Button variant="info" value='4' 
                                        onClick={this.handleToggleChange}>4</Button>
                                    <Button variant="secondary" value='5' 
                                        onClick={this.handleToggleChange}>5</Button>
                                </ButtonGroup>
                            </p>
                        </Form.Group>
                        <Form.Group>
                            <Form.Check
                                custom="true"
                                label="비공개로 하실 거면, 체크를 해주세요."
                                checked={privacy=="private"?true:false}
                                onChange={this.handleCheckBoxChange}
                                id="validationFormik0"
                                />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        {
                            disable?
                            <Button variant="primary">작성완료</Button>
                            :<Button variant="primary" onClick={this.submitModifyingTodoForm}>작성완료</Button>
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

const ModifyTodoModalContainer = connect(
    (state) => ({
        todoList: state.todo.get('todoList'),
    }),
    (dispatch) => ({
        TodoActions: bindActionCreators(todoActions, dispatch)
    })
)(ModifyTodoModal);

export default ModifyTodoModalContainer;