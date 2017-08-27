/* eslint-disable import/no-extraneous-dependencies */
const connect = require('koa2-connect');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.client');

const compiler = webpack(config);

exports.devMiddleware = connect(
  webpackDevMiddleware(compiler, {
    reload: true,
    publicPath: config.output.publicPath,
    stats: 'minimal',
  }),
);

exports.hotMiddleware = connect(webpackHotMiddleware(compiler));
