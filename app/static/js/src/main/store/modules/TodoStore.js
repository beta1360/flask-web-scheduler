import axios from 'axios';

const GET_TODOLIST = "todo/TODOLIST"
const GET_TODO = "todo/TODOCOMPONENT"
const ADD_TODO = "todo/ADD";
const MODIFY_TODO = "todo/MODIFY";
const DELETE_TODO = "todo/DELETE";

export const getTodoList = (userId) => ({type: GET_TODOLIST, userId});
export const getTodoComponent = (no) => ({type: GET_TODO, no});
export const addTodo = () => ({type: ADD_TODO});
export const modifyTodo = () => ({type: MODIFY_TODO});
export const deleteTodo = () => ({type: DELETE_TODO});

const initialState = {
    todoList: [],
}

export default function manageTodoTable(state = initialState, action) {
    switch(action.type){
        case GET_TODOLIST:
            return {
                ...state,
                todoList: (()=>{
                    axios.get('http://localhost:13609/todo/list', {
                        params: {id: this.state.userId}
                    }).then((response)=> {
                        let todos = response.data;
                        const tmp = state.todoList;
        
                        return tmp.concat(todos["todos"]);
                    });
                })
            };
        case GET_TODO:
            return {

            };
        case ADD_TODO:
            return {
                ...state,
                job: ADD_TODO
            };
        case MODIFY_TODO:
            return {
                ...state,
                job: MODIFY_TODO
            };
        case DELETE_TODO:
            return {
                ...state,
                job: DELETE_TODO
            };
        default:
            return state;
    }
}