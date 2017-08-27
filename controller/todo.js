const Todo = require('../model/todo');

exports.getTodos = async (ctx) => {
  const todos = await Todo
    .find()
    .sort({ createdAt: -1 });
  ctx.type = 'json';
  ctx.body = {
    todos,
    ok: true,
  };
};

exports.addTodo = async (ctx) => {
  const todo = new Todo(ctx.request.body);
  await todo.save();
  ctx.type = 'json';
  ctx.body = {
    ok: true,
  };
};

exports.patchTodo = async (ctx) => {
  const todo = await Todo
    .findOneAndUpdate(ctx.params.id, ctx.request.body);
  ctx.type = 'json';
  ctx.body = {
    todo,
    ok: true,
  };
};

exports.removeTodo = async (ctx) => {
  await Todo
    .findById(ctx.params.id)
    .remove();
  ctx.type = 'json';
  ctx.body = {
    ok: true,
  };
};
