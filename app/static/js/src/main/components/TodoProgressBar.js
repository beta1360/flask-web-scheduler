import '@babel/polyfill';
import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import * as todoActions from '../store/modules/reducers/TodoActions'
import { connect } from 'react-redux';

class TodoProgressBar extends Component {

    constructor(context, props){
        super(context, props);

        this.state = {
            todoPercent: 0,
            doingPercent: 0,
            donePercent: 0
        }
    }

    getProgressPercent = (todoList) => {
        const todoListSize = todoList.size;

        let todoCount = 0;
        let doingCount = 0;
        let doneCount = 0;

        todoList.map((todo)=>{
            const progress = todo.get('progress');

            if(progress == "TODO") todoCount++;
            else if(progress == "DOING") doingCount++;
            else doneCount++;
        });

        return {
            "todoPercent": parseInt(Number((todoCount/todoListSize)*100)),
            "doingPercent": parseInt(Number((doingCount/todoListSize)*100)),
            "donePercent": parseInt(Number((doneCount/todoListSize)*100))
        }
    }

    setProgressPercent = (todoPercent, doingPercent, donePercent) => {
        this.setState({todoPercent: todoPercent})
        this.setState({doingPercent: doingPercent})
        this.setState({donePercent: donePercent})
    }

    componentDidMount = () => {
        const { todoPercent, doingPercent, donePercent } 
                = this.getProgressPercent(this.props.todoList);

        this.setProgressPercent(todoPercent, doingPercent, donePercent);
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        const { todoPercent, doingPercent, donePercent } = this.state;
        
        const nextPercents = this.getProgressPercent(nextProps.todoList);
        const nextTodoPercent = nextPercents.todoPercent;
        const nextDoingPercent = nextPercents.doingPercent;
        const nextDonePercent = nextPercents.donePercent;

        if( (todoPercent != nextTodoPercent)
            || (doingPercent != nextDoingPercent)
            || (donePercent != nextDonePercent)){

                this.setProgressPercent(nextTodoPercent, nextDoingPercent, nextDonePercent);        
            }
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        const { todoPercent, doingPercent, donePercent } = this.state;
        
        const nextPercents = this.getProgressPercent(nextProps.todoList);
        const nextTodoPercent = nextPercents.todoPercent;
        const nextDoingPercent = nextPercents.doingPercent;
        const nextDonePercent = nextPercents.donePercent;

        return (todoPercent != nextTodoPercent)
            || (doingPercent != nextDoingPercent)
            || (donePercent != nextDonePercent);
    }

    render = () => {
        const { todoPercent, doingPercent, donePercent } = this.state;

        return (
            <ProgressBar>
                <ProgressBar animated variant="danger" now={todoPercent} key={1} label={`${todoPercent}%`}/>
                <ProgressBar animated variant="primary" now={doingPercent} key={2} label={`${doingPercent}%`}/>
                <ProgressBar animated variant="success" now={donePercent} key={3} label={`${donePercent}%`}/>
            </ProgressBar>
        );
    }
};

const TodoProgressBarContainer = connect(
    (state) => ({
        todoList: state.todo.get('todoList'),
        rerender: state.todo.get('rerender'),
        pending: state.todo.get('pending')
    }),
    (dispatch) => ({
        TodoActions: bindActionCreators(todoActions, dispatch)
    })
)(TodoProgressBar);

export default TodoProgressBarContainer;