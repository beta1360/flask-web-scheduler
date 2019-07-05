import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class TodoItem extends Component {
    constructor(props, context){
        super(props, context);

        this.setDateToString = this.setDateToString.bind(this);

        this.defaultProps = {
            no: 0,
            name: 'None',
            title: '(제목 없음)',
            date_y: 2000,
            date_m: 1,
            date_d: 1,
            level: 0
        };
    }

    setDateToString(){
        let date_y = this.props.date_y;
        let date_m = this.props.date_m;
        let date_d = this.props.date_d;

        let str = date_y + ".";

        if(date_m < 10) str += "0";
        str += date_m + ".";

        if(date_d < 10) str += "0";
        str += date_d;

        return str;
    }

    render(){

        return(
            <tr>
                <th>{this.props.no}</th>
                <th>{this.props.title}</th>
                <th>{this.props.name}</th>
                <th>{this.setDateToString()}</th>
                <th>{this.props.level}</th>
                <th>
                    <Button variant="primary">상세보기</Button>
                    <Button variant="success">수정</Button>
                    <Button variant="danger">삭제</Button>
                </th>
            </tr>
        );
    }

}

export default TodoItem;