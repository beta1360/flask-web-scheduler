const ADD_TODO = "todo/add";
const MODIFY_TODO = "todo/modify";
const DELETE_TODO = "todo/delete";

export const addTodo = () => ({type: ADD_TODO});
export const modifyTodo = () => ({type: MODIFY_TODO});
export const deleteTodo = () => ({type: DELETE_TODO});

const initialState = {
    job: 'undefined'
}

export default function manageTodoTable(state = initialState, action) {
    switch(action.type){
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