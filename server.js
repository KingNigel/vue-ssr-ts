const { promisify } = require('util');
const fs = require('fs');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const send = require('koa-send');
const Router = require('koa-router');
const webpack = require('webpack');
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');
const config = require('./webpack.config');

const app = new Koa();
const router = new Router();

const compiler = webpack(config);
app.use(devMiddleware(compiler, {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  stats: 'minimal',
}));
app.use(hotMiddleware(compiler));

app.use(bodyParser())

const getData = () => JSON.parse(fs.readFileSync('data.json', 'utf8'));

router
  .get('/todo',  async (ctx) => {
    const { todos } = await getData();
    ctx.body = JSON.stringify({
      todos,
      total: todos.length,
      ok: true,
    });
  })

  .post('/todo', async (ctx) => {
    const todo = ctx.request.body;
    const data = await getData();
    data.todos.push(todo);
    await promisify(fs.writeFile)('data.json', JSON.stringify(data, null, 2));
    ctx.body = JSON.stringify({
      ok: true
    })
  })

  .get('*', async (ctx) => {
    const htmlBuffer = compiler.outputFileSystem.readFileSync(`${config.output.path}/index.html`);
    ctx.type = 'html';
    ctx.body = htmlBuffer.toString();
  });

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
