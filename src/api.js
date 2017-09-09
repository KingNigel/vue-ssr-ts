/* eslint-disable */
/* fuck webpack there is no way to uglify es6 code */
/* I've tried every thing, every plugin! */
const isNode = process.env.RUNTIME === 'node';
const fetch = isNode ? require('isomorphic-fetch') : window.fetch;

var host = process.env.NODE_ENV === 'production' ? 'https://ts-vue-todo.herokuapp.com' : 'http://localhost:3000';

exports.getTodos = function() {
  return fetch((isNode ? host : '') + '/todo')
    .then(function(res) { return res.json(); });
};


exports.addTodo = function (body) {
  return fetch('/todo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body,
  }).then(function(res) { return res.json(); });
};

exports.completeTodo = function(id) {
  return fetch('/todo/' + id, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: true })
  }).then(function(res) { return res.json(); });
};

exports.removeTodo = function(id) {
  return fetch('/todo/' + id, {
    method: 'DELETE'
  }).then(function(res) { return res.json(); });
};
