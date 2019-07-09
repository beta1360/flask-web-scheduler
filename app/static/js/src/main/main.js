import React from 'react';
import ReactDOM from 'react-dom';
import LogoutBtn from './components/LogoutBtn';
import TodoTable from './components/TodoTable';

ReactDOM.render(<LogoutBtn/>, document.getElementById('logoutBtn'));
ReactDOM.render(<TodoTable />, document.getElementById('todoTable'));
