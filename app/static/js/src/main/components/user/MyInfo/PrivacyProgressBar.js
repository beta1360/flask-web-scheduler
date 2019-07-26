import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';

class PrivacyProgressBar extends Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            publicPercent: 0,
            privatePercent: 0
        }
    }

    calculateProgressPercent = () => {
        const { publicTodo, privateTodo } = this.props;
        let allTodo = publicTodo + privateTodo;

        if(allTodo != 0){
            if(publicTodo != 0)
                this.setState({publicPercent: parseInt(Number((publicTodo/allTodo)*100))});
            
            if(privateTodo != 0)
                this.setState({privatePercent: parseInt(Number((privateTodo/allTodo)*100))});
            
            const { publicPercent, privatePercent } = this.state;
            const remainPercent = 100 - (publicPercent + privatePercent);

            if(privatePercent != 0) 
                this.setState({privatePercent: privatePercent+remainPercent});
        }
    }

    componentDidMount = () => {
        this.calculateProgressPercent();
    }

    drawProgressBar = () => {
        const { publicPercent, privatePercent } = this.state;

        return (
            <ProgressBar>
                <ProgressBar animated variant="danger" now={publicPercent} key={4} label={`${publicPercent}%`}/>
                <ProgressBar animated variant="primary" now={privatePercent} key={5} label={`${publicPercent}%`}/>
            </ProgressBar>
        );
    }

    render = () => {
        return this.drawProgressBar();
    }
}

export default PrivacyProgressBar;
