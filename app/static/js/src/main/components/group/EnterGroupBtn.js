import '@babel/polyfill';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import * as groupActions from '../../../store/modules/reducers/GroupActions'
import { connect } from 'react-redux';

class EnterGroupBtn extends Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            disable: false
        }
    }

    disableEnterGroupBtn = () => {
        this.setState({ disable: true });
    }

    enableEnterGroupBtn = () => {
        this.setState({ disable: false });
    }

    enterGroup = async (groupCode) => {
        const { GroupActions } = this.props;

        await GroupActions.enterGroup(groupCode);
    }

    onClickEnterGroupBtn = () => {
        this.disableEnterGroupBtn();

        const { groupCode, groupName } = this.props;
        
        if(confirm(groupName + " 그룹에 참여하시겠습니까?")){
            this.enterGroup(groupCode);
            alert(groupName + " 그룹에 오신 것을 환영합니다!");
            location.reload();
        }

        this.enableEnterGroupBtn();
    }

    render = () => {
        const { disable } = this.state;


        return (
            <div>
            {
                disable?
                <Button variant="primary">참여하기</Button>
                :<Button variant="primary" 
                    onClick={this.onClickEnterGroupBtn}>참여하기</Button>
            }
            </div>
        );
    }
}

const EnterGroupBtnContainer = connect(
    (state) => ({
        groupList: state.group.get('groupList'),
        message: state.group.get('message'),
        pending: state.group.get('pending'),
        rerender: state.group.get('rerender'),
    }),
    (dispatch) => ({
        GroupActions: bindActionCreators(groupActions, dispatch)
    })
)(EnterGroupBtn);

export default EnterGroupBtnContainer;