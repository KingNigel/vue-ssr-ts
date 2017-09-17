const isNode = process.env.RUNTIME === 'node';
const fetch = isNode ? require('isomorphic-fetch') : window.fetch;

const host = process.env.NODE_ENV === 'production' ? 'https://ts-vue-todo.herokuapp.com' : 'http://localhost:3000';

exports.getTodos = () =>
  fetch(`${isNode ? host : ''}/todo`)
    .then(res => res.json());

exports.addTodo = body => fetch('/todo', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body,
}).then(res => res.json());

exports.completeTodo = id => fetch(`/todo/${id}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ completed: true }),
}).then(res => res.json());

exports.removeTodo = id => fetch(`/todo/${id}`, {
  method: 'DELETE',
}).then(res => res.json());
