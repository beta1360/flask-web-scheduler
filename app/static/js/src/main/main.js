import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import MainHomeContainer from './components/MainHome';
import store from '../store';

ReactDOM.render(
    <Provider store={store}><MainHomeContainer /></Provider>, 
    document.getElementById('root'));
