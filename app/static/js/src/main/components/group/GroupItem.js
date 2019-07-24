import '@babel/polyfill';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import * as groupActions from '../../../store/modules/reducers/GroupActions'
import { connect } from 'react-redux';
import EnterGroupBtnContainer from './EnterGroupBtn';

class GroupItem extends Component {

    constructor(props, context){
        super(props, context);

    }

    getEnterGroupButton = (groupNum, groupCode, groupName) => {
        if(groupNum == 1) {
            return <EnterGroupBtnContainer 
                    groupCode={groupCode} groupName={groupName}/>;
        }
        else
            return <></>;
    }

    render = () => {
        const { groupNum } = this.props;
        const { group_num, group_name, group_code } = this.props.group;

        return (
            <tr>
                <th>{group_num}</th>
                <th>{group_name}</th>
                <th><Button variant="outline-primary">상세보기</Button></th>
                <th>{this.getEnterGroupButton(groupNum, group_code, group_name)}</th>
            </tr>
        );
    }
}

const GroupItemContainer = connect(
    (state) => ({
        groupList: state.group.get('groupList'),
        message: state.group.get('message'),
        pending: state.group.get('pending'),
        rerender: state.group.get('rerender'),
    }),
    (dispatch) => ({
        GroupActions: bindActionCreators(groupActions, dispatch)
    })
)(GroupItem);

export default GroupItemContainer;