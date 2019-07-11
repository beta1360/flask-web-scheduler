import '@babel/polyfill';
import axios from 'axios';

export const getTodoTable = async (userId) => {
    const res = await axios.get('http://localhost:13609/todo/list', {
        params: {id: userId}});

    return res.data.todos;
}