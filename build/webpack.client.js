const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = Object.assign({}, baseConfig, {
  entry: [
    'webpack-hot-middleware/client?noInfo=true',
    path.resolve(__dirname, '../src/entry-client.ts'),
  ],

  module: {
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
      },
    ],
  },

  devtool: '#eval-source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});

if (process.env.NODE_ENV === 'production') {
  module.exports.entry = [path.resolve(__dirname, '../src/entry-client.ts')];

  module.exports.devtool = '#source-map';

  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new ExtractTextPlugin('app.css'),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ]);
}
