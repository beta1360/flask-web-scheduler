import React from 'react';
import ReactDOM from 'react-dom';
import SignUpForm from './components/SignUpForm';
import LogInForm from './components/LogInForm';

ReactDOM.render(<SignUpForm/>, document.getElementById('signUpBtn'));
ReactDOM.render(<LogInForm/>, document.getElementById('logInBtn'));