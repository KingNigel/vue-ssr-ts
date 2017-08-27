const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const mongoose = require('mongoose');
const { getTodos, addTodo, patchTodo, removeTodo } = require('./controller/todo');
const { ssr } = require('./controller/ssr');

const app = new Koa();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:123456@ds034677.mlab.com:34677/todo', { useMongoClient: true })
  .then(() => global.console.log('Connected to database successfully'))
  .catch(error => global.console.log(error));


if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable global-require */
  const { devMiddleware, hotMiddleware } = require('./build/middleware');
  app
    .use(devMiddleware)
    .use(hotMiddleware);
}

router
  .get('/todo', getTodos)
  .post('/todo', addTodo)
  .patch('/todo/:id', patchTodo)
  .delete('/todo/:id', removeTodo)
  .get('*', ssr);

app
  .use(serve('dist'))
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(process.env.PORT || 3000);
