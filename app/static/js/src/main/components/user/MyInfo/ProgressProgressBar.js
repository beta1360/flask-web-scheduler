import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';

class ProgressProgressBar extends Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            todoPercent: 0,
            doingPercent: 0,
            donePercent: 0
        }
    }

    calculateProgressPercent = () => {
        const { progressTodo, progressDoing, progressDone } = this.props;
        let allTodo = progressTodo + progressDoing + progressDone;

        if(allTodo != 0){
            if(progressTodo != 0)
                this.setState({todoPercent: parseInt(Number((progressTodo/allTodo)*100))});
            
            if(progressDoing != 0)
                this.setState({doingPercent: parseInt(Number((progressDoing/allTodo)*100))});
            
            if(progressDone != 0)
                this.setState({donePercent: parseInt(Number((progressDone/allTodo)*100))});
                
            const { todoPercent, doingPercent, donePercent } = this.state;
            const remainPercent = 100 - (todoPercent, doingPercent, donePercent);

            if(donePercent != 0) 
                this.setState({donePercent: donePercent+remainPercent});
            else if(doingPercent != 0) 
                this.setState({doingPercent: doingPercent+remainPercent});
        }
    }

    componentDidMount = () => {
        this.calculateProgressPercent();
    }

    drawProgressBar = () => {
        const {todoPercent, doingPercent, donePercent } = this.state;

        return (
            <ProgressBar>
                <ProgressBar animated variant="danger" now={todoPercent} key={1} label={`${todoPercent}%`}/>
                <ProgressBar animated variant="primary" now={doingPercent} key={2} label={`${doingPercent}%`}/>
                <ProgressBar animated variant="success" now={donePercent} key={3} label={`${donePercent}%`}/>
            </ProgressBar>
        );
    }

    render = () => {
        return this.drawProgressBar();
    }
}

export default ProgressProgressBar;