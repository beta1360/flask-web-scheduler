import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import LogoutBtn from './components/LogoutBtn';
import TodoTableContainer from './components/TodoTable';
import store from './store';

ReactDOM.render(
    <Provider store={store}><LogoutBtn /></Provider>, 
    document.getElementById('logoutBtn'));

ReactDOM.render(
    <Provider store={store}><TodoTableContainer /></Provider>, 
    document.getElementById('todoTable'));
