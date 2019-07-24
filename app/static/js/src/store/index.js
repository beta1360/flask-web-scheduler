import { combineReducers } from 'redux';
import todo from './modules/reducers/TodoActions';
import group from './modules/reducers/GroupActions';

const reducers = combineReducers({
    todo,
    group,
    
});

export default reducers;