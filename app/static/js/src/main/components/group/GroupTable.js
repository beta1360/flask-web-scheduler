import '@babel/polyfill';
import React, { Component, Fragment } from 'react';
import { Table } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import * as groupActions from '../../../store/modules/reducers/GroupActions'
import { connect } from 'react-redux';
import GroupListContainer from './GroupList';

class GroupTable extends Component {

    constructor(props, context){
        super(props, context);
    
    }

    render = () => {
        const { userId, userName, groupNum } = this.props;

        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>no</th>
                        <th>그룹명</th>
                        <th>상세보기</th>
                        <th>참여</th>
                    </tr>
                </thead>
                <tbody>
                    <GroupListContainer 
                        userId={userId} userName={userName} groupNum={groupNum}/>
                </tbody>
            </Table>
        );
    }
}

const GroupTableContainer = connect(
    (state) => ({
        groupList: state.group.get('groupList'),
        message: state.group.get('message'),
        pending: state.group.get('pending'),
        rerender: state.group.get('rerender'),
    }),
    (dispatch) => ({
        GroupActions: bindActionCreators(groupActions, dispatch)
    })
)(GroupTable);

export default GroupTableContainer;