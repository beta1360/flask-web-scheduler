import axios from 'axios';
import { List, Map } from 'immutable';
import { handleActions } from 'redux-actions';
import * as url from '../../../config';

const GET_GROUPLIST = "GROUP/GET_LIST";
const CHECK_GROUP = "GROUP/CHECK"
const ADD_GROUP = "GROUP/ADD";
const ENTER_GROUP = "GROUP/ENTER";
const LEAVE_GROUP = "GROUP/LEAVE";
const GET_PENDING = 'GET_PENDING';
const GROUP_RERENDER = "GROUP/RERENDER";

export const getGroupList = () => {
    return (dispatch) => {
        dispatch({type: GET_PENDING});

        return axios.get(url.GET_GROUP_LIST_URL)
            .then((response) => {
                const { groups } = response.data;
                const mappingGroups = groups.map(group=>Map(group));

                dispatch({
                    type: GET_GROUPLIST,
                    payload: List(mappingGroups)
                });
            });
    }
}

export const checkGroup = (groupCode) => {
    return (dispatch) => {
        dispatch({type: GET_PENDING});

        return axios.post(url.GROUP_CHECK_URL, {
                group_code: groupCode
            }).then((response) => {
                const { message } = response.data;
                dispatch({
                    type: CHECK_GROUP,
                    payload: message
                });
            });
    }
}

export const addGroup = (groupCode, groupName, privacy) => {
    return (dispatch) => {
        dispatch({type: GET_PENDING});

        return axios.post(url.ADD_GROUP_URL, {
                group_name: groupName,
                group_code: groupCode,
                privacy: privacy
            }).then((response) => {
                dispatch({
                    type: ADD_GROUP,
                    payload: response.data
                });
            });
    }
}

export const enterGroup = (groupCode) => {
    return (dispatch) => {
        dispatch({type: GET_PENDING});

        return axios.post(url.ENTER_GROUP_URL, {
                group_code: groupCode
            }).then((response) => {
                const { message } = response.data;

                dispatch({
                    type: ENTER_GROUP,
                    payload: message 
                });
            })
    }
}

export const leaveGroup = () => {
    return (dispatch) => {
        dispatch({type: GET_PENDING});

        return axios.delete(url.LEAVE_GROUP_URL)
            .then((response) => {
                dispatch({type: LEAVE_GROUP});
            });
    }
}

export const groupRerender = () => {
    return (dispatch) => {
        dispatch({type: GROUP_RERENDER});
    }
}


const initialState = Map({ 
    pending: true,
    rerender: true,
    groupList: List([]),
    message: '',
    statusCode: 200
});

export default handleActions(
    {
        [GET_PENDING]: (state, action) => (
            state.set('pending', true)
        )
        ,[GROUP_RERENDER]: (state, action) => (
            state.set('rerender', false)
        )
        ,[GET_GROUPLIST]: (state, action) => (
            state.set('pending', false)
                .set('groupList', action.payload)
                .set('rerender', true)
        )
        ,[CHECK_GROUP]: (state, action) => (
            state.set('pending', false)
                .set('message', action.payload)
        )
        ,[ADD_GROUP]: (state, action) => (
            state.set('pending', false)
                .set('message', action.payload.message)
                .set('statusCode', action.payload.code)
                .set('rerender', true) 
        )
        ,[ENTER_GROUP]: (state, action) => (
            state.set('pending', false)
                .set('message', action.payload)
        )
        ,[LEAVE_GROUP]: (state, action) => (
            state.set('pending', false)
        )
    }, 
    initialState
);
