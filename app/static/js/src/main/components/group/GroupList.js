import '@babel/polyfill';
import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import * as groupActions from '../../../store/modules/reducers/GroupActions'
import { connect } from 'react-redux';
import { List } from 'immutable';
import GroupItemContainer from './GroupItem';

class GroupList extends Component {

    constructor(props, context){
        super(props, context);
    
        this.state = {
            visible: false,
            groupList: List([])
        }
    }

    showGroupList = () => {
        this.setState({visible: true});
    }

    loadingGroupList = () => {
        this.setState({visible: false});
    }

    getGroupList = async () => {
        const { GroupActions } = this.props;
        await GroupActions.getGroupList();
        this.getStateFromProps();
    }

    getStateFromProps = () => {
        this.loadingGroupList();

        const { groupList } = this.props;
        this.setState({groupList: groupList})

        this.showGroupList();
    }

    drawGroupTable = () => {
        const { groupNum } = this.props;
        const { groupList } = this.state;

        return groupList.map((group) => {
            const groupComp = group.toJS();
            return <GroupItemContainer group={groupComp} key={group.get("group_num")} groupNum={groupNum}/>
        });
    }

    componentDidMount = () => {
        this.getGroupList();
    }

    componentDidUpdate = (prevProps, prevState) => {
        const { GroupActions, rerender } = this.props;
        const prevRerender = prevProps.rerender;
        const pending = prevProps.pending;

        if(prevRerender && !rerender && !pending
            || prevProps.range != this.props.range){
            this.getGroupList();
            GroupActions.groupRerender();
        }
    }


    render = () => {
        const { visible } = this.state;
        if(visible)
            return this.drawGroupTable();
        
        else 
            return <Spinner animation="border"/>;
    }
}

const GroupListContainer = connect(
    (state) => ({
        groupList: state.group.get('groupList'),
        message: state.group.get('message'),
        pending: state.group.get('pending'),
        rerender: state.group.get('rerender'),
    }),
    (dispatch) => ({
        GroupActions: bindActionCreators(groupActions, dispatch)
    })
)(GroupList);

export default GroupListContainer;