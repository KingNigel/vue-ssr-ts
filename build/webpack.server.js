const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const baseConfig = require('./webpack.base');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = Object.assign({}, baseConfig, {
  entry: path.resolve(__dirname, '../src/entry-server.ts'),

  output: Object.assign({
    libraryTarget: 'commonjs2',
  }, baseConfig.output),

  module: {
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.css$/,
        loader: 'css-loader',
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
      },
    ],
  },

  target: 'node',

  externals: nodeExternals({
    whitelist: /\.css$/,
  }),

  devtool: '#source-map',

  plugins: [
    new VueSSRServerPlugin(),
  ],
});

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        RUNTIME: '"node"',
      },
    }),
    new ExtractTextPlugin('app.css'),
  ]);
}
