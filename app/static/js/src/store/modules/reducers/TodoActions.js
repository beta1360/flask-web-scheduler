import axios from 'axios';
import { List, Map } from 'immutable';
import { handleActions } from 'redux-actions';
import * as url from '../../../config';

const GET_PENDING = 'GET_PENDING';
const GET_TODOLIST = "TODO/TODOLIST";
const ADD_TODO = "TODO/ADD";
const MODIFY_TODO = "TODO/MODIFY";
const DELETE_TODO = "TODO/DELETE";
const TODO_RERENDER = "TODO/RERENDER";
const MODIFY_PROGRESS = "TODO/MODIFY_PROGRESS";

export const getTodoList = (userId, range) => {
    return (dispatch) => {
        dispatch({type: GET_PENDING});

        return axios.get(url.GET_TODO_LIST_URL, {
            params: {id: userId, range: range}}
        ).then((response) => {
            const { todos } = response.data;
            const mappingTodo = todos.map(todo=>Map(todo));

            dispatch({
                type: GET_TODOLIST,
                payload: List(mappingTodo)
            });
        });
    }
}

export const addTodo = (title, date_y, date_m, date_d, body, level, privacy) => {
    return (dispatch) => {
        dispatch({type: GET_PENDING});
        
        return axios.post(url.ADD_TODO_URL, {
            title: title,
            date_y: date_y,
            date_m: date_m,
            date_d: date_d,
            body: body,
            level: level,
            privacy: privacy
        }).then((response) => {
            dispatch({type: ADD_TODO});
        });
    }
}

export const modifyTodo = (no, title, date_y, date_m, date_d, body, level, progress, privacy) => {
    return (dispatch) => {
        dispatch({type: GET_PENDING});
        
        return axios.post(url.MODIFY_TODO_URL, {
            no: no,
            title: title,
            date_y: date_y,
            date_m: date_m,
            date_d: date_d,
            body: body,
            level: level,
            progress: progress,
            privacy: privacy
        }).then((response) => {
            dispatch({type: MODIFY_TODO});
        });
    }
}

export const deleteTodo = (no) => {
    return (dispatch) => {
        dispatch({type: GET_PENDING});

        return axios.delete(url.DELETE_TODO_URL, {
            params: {no: no}
        }).then((response) => {
            dispatch({type: DELETE_TODO});
        });
    }
}

export const todoRerender = () => {
    return (dispatch) => {
        dispatch({type: TODO_RERENDER});
    }
}

export const modifyProgress = (no, progress) => {
    return (dispatch) => {
        dispatch({type: GET_PENDING});

        return axios.post(url.MODIFY_PROGRESS_TODO_URL, {
            no: no,
            progress: progress
        }).then((response)=>{
            dispatch({ type: MODIFY_PROGRESS })
        });
    }
}

const initialState = Map({    
    pending: false,
    todoList: List([]),
    rerender: false
});

export default handleActions(
    {
        [GET_PENDING]: (state, action) => (
            state.set('pending', true)
        )
        ,[GET_TODOLIST]: (state, action) => (
            state.set('todoList', action.payload)
                        .set('pending', false)
                        .set('rerender', true)
        )
        ,[ADD_TODO]: (state, action) => (
            state.set('pending', false)
                .set('rerender', true)
        )
        ,[MODIFY_TODO]: (state, action) => (
            state.set('pending', false)
                .set('rerender', true)
        )
        ,[DELETE_TODO]: (state, action) => (
            state.set('pending', false)
                .set('rerender', true)
        )
        ,[TODO_RERENDER]: (state, action) => (
            state.set('rerender', false)
        )
        ,[MODIFY_PROGRESS]: (state, action) => (
            state.set('pending', false)
                .set('rerender', true)
        )
    }, 
    initialState
);
