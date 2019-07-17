import { List, Map } from 'immutable';

const GET_TODOLIST = "todo/TODOLIST"
const GET_TODO = "todo/TODOCOMPONENT"
const ADD_TODO = "todo/ADD";
const MODIFY_TODO = "todo/MODIFY";
const DELETE_TODO = "todo/DELETE";

export const getTodoList = (userId) => ({type: GET_TODOLIST, userId});
export const getTodoComponent = (no) => ({type: GET_TODO, no});
export const addTodo = (todo) => ({type: ADD_TODO, todo});
export const modifyTodo = (no) => ({type: MODIFY_TODO, no});
export const deleteTodo = (no) => ({type: DELETE_TODO, no});

const initialState = {
    todoList: List([]),
}

export default function manageTodoTable(state = initialState, action) {
    switch(action.type){
        case GET_TODOLIST:
            return {
                
            };
        case GET_TODO:
            return {
                ...state,
            };
        case ADD_TODO:
            return {
                ...state,
                
            };
        case MODIFY_TODO:
            return {
                ...state,
                
            };
        case DELETE_TODO:
            return {
                ...state,
                
            };
        default:
            return state;
    }
}