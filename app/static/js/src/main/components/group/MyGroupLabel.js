import '@babel/polyfill';
import React, { Component } from 'react';
import { Button, Badge } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import * as groupActions from '../../../store/modules/reducers/GroupActions'
import { connect } from 'react-redux';

class MyGroupLabel extends Component {

    constructor(props, context){
        super(props, context);

    }

    onClickLeaveGroupBtn = () => {
        const { groupName } = this.props;

        if(confirm("정말로 그룹을 나가시겠습니까?")){
            this.leaveCurrentGroup();
            alert(groupName + " 그룹에서 탈퇴하였습니다.");
            location.reload();
        }
    }

    leaveCurrentGroup = async () => {
        const { GroupActions } = this.props;

        await GroupActions.leaveGroup();
        GroupActions.groupRerender();
    }

    getCurrentGroup = () => {
        const { groupName, groupNum } = this.props;

        if(groupNum != 0){
            return (
                <div>
                    <b>나의 그룹: </b>{groupName}  <Badge pill variant="primary">public</Badge>
                    <Button className="float-right" variant="outline-danger" onClick={this.onClickLeaveGroupBtn}>그룹 나가기</Button>
                </div>
            );
        } 
        else 
            return <div><b>현재 참여 중인 그룹이 없습니다. 그룹에 참여해보세요.</b></div>
        
    }

    render = () => {
        return this.getCurrentGroup();
    }
}

const MyGroupLabelContainer = connect(
    (state) => ({
        groupList: state.group.get('groupList'),
        message: state.group.get('message'),
        pending: state.group.get('pending'),
        rerender: state.group.get('rerender'),
    }),
    (dispatch) => ({
        GroupActions: bindActionCreators(groupActions, dispatch)
    })
)(MyGroupLabel);

export default MyGroupLabelContainer;