import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';

class LevelProgressBar extends Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            onePercent: 0,
            twoPercent: 0,
            threePercent: 0,
            fourPercent: 0,
            fivePercent: 0
        }
    }

    calculateProgressPercent = () => {
        const { levelOne, levelTwo, levelThree, levelFour, levelFive } = this.props;
        let allTodo = levelOne + levelTwo + levelThree + levelFour + levelFive;

        if(allTodo != 0){
            if(levelOne != 0)
                this.setState({onePercent: parseInt(Number((levelOne/allTodo)*100))});
            
            if(levelTwo != 0)
                this.setState({twoPercent: parseInt(Number((levelTwo/allTodo)*100))});
            
            if(levelThree != 0)
                this.setState({threePercent: parseInt(Number((levelThree/allTodo)*100))});
            
            if(levelFour != 0)
                this.setState({fourPercent: parseInt(Number((levelFour/allTodo)*100))});
            
            if(levelFive != 0)
                this.setState({fivePercent: parseInt(Number((levelFive/allTodo)*100))});
        }
    }

    componentDidMount = () => {
        this.calculateProgressPercent();
    }

    drawProgressBar = () => {
        const { onePercent, twoPercent, threePercent, fourPercent, fivePercent } = this.state;

        return (
            <div>
                <ProgressBar>
                    <ProgressBar animated striped variant="danger" now={onePercent} key={6} label={`${onePercent}%`}/>
                    <ProgressBar animated striped variant="warning" now={twoPercent} key={7} label={`${twoPercent}%`}/>
                    <ProgressBar animated striped variant="success" now={threePercent} key={8} label={`${threePercent}%`}/>
                    <ProgressBar animated striped variant="info" now={fourPercent} key={9} label={`${fourPercent}%`}/>
                    <ProgressBar animated striped variant="secondary" now={fivePercent} key={10} label={`${fivePercent}%`}/>
                </ProgressBar>
            </div>
        );
    }

    render = () => {
        return this.drawProgressBar();
    }
}

export default LevelProgressBar;