import { combineReducers } from 'redux';
import todo from './modules/reducers/TodoActions';

const reducers = combineReducers({
    todo,

});

export default reducers;