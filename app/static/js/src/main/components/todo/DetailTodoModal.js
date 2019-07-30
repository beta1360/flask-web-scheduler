import { Modal, Button, Badge } from 'react-bootstrap';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as todoActions from '../../../store/modules/reducers/TodoActions'
import { connect } from 'react-redux';
import DeleteTodoAlertContainer from './DeleteTodoAlert'
import ModifyTodoModalContainer from './ModifyTodoModal'
import Remarkable from 'remarkable';

class DetailTodoModal extends Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            show: false
        }

        this.defaultProps = {
            todo: undefined
        };
    }

    handleClose = () => {
        this.setState({show: false});
    }

    handleShow = () => {
        this.setState({show: true});
    }

    setDateToString = () => {
        const { date_y, date_m, date_d } = this.props.todo;

        let str = date_y + "/";

        if(date_m < 10) str += "0";
        str += date_m + "/";

        if(date_d < 10) str += "0";
        str += date_d;

        return str;
    }

    getBadgeColorByProgress = () => {
        switch(this.props.todo.progress){
            case "TODO":
                return "danger";
            case "DOING":
                return "primary";
            default:
                return "success";
        }
    }

    getModifyButton = (no, title, startDate, body, level, progress, privacy) => {
        if(this.props.isEqual){
            return (
                <ModifyTodoModalContainer no={no} title={title} startDate={startDate} 
                    content={body} level={level} progress={progress} privacy={privacy}/>);
        } else 
            return <div></div>;
    }

    getDeleteButton = (no) => {
        if(this.props.isEqual) return <DeleteTodoAlertContainer no={no}/>;
        else return <div></div>
    }

    getRawMarkup = (content) => {
        const md = new Remarkable();
        return { __html: md.render(content) };
      }
    

    shouldComponentUpdate = (nextProps, nextState) => {
        return ( nextProps !== this.props
            || nextState !== this.state );
    }

    render = () => {
        const { progress, no, title, level, body, privacy } = this.props.todo;
        const { show } = this.state;

        return(
            <div>
                <Button variant="primary" onClick={this.handleShow}>상세보기</Button>

                <Modal show={show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <Badge variant={this.getBadgeColorByProgress()}>{progress}
                                </Badge>#{no} <b>{title}</b>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><label><b>우선 순위: </b> {level}</label></p>
                        <p><label><b>해야될 날짜: </b> {this.setDateToString()}</label></p>
                        <p><label><b>상세 내용: </b></label></p>
                        <div className="content"
                            dangerouslySetInnerHTML={this.getRawMarkup(body)}/>
                    </Modal.Body>
                    <Modal.Footer>
                        {this.getModifyButton(no, title, this.setDateToString(), 
                            body, level, progress, privacy)}
                        {this.getDeleteButton(no)}
                        <Button variant="dark" onClick={this.handleClose}>닫기</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
};

const DetailTodoModalContainer = connect(
    (state) => ({
        todoList: state.todo.get('todoList'),
    }),
    (dispatch) => ({
        TodoActions: bindActionCreators(todoActions, dispatch)
    })
)(DetailTodoModal);

export default DetailTodoModalContainer;