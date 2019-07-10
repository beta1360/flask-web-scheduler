import { combineReducers } from 'redux';
import manageTodoTable from './modules/TodoStore';

const todoReducer = combineReducers({
    manageTodoTable,

});

export default todoReducer;