const path = require('path');
const webpack = require('webpack');
const configBase = require('./webpack.base.js');
const merge = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');

//获取本机ip
const config = {
  entry: path.resolve(__dirname, './test/index.js'),
  module: {
    rules: [],
  },
  devtool: 'eval-source-map',
  mode: 'development',
  devServer: {
    host: 'localhost', //localhost
    contentBase: path.join(__dirname, './build'),
    inline: true,
    hot: true,
    open: true,
    port: 5001,
    historyApiFallback: true,
    watchOptions: {
      //监听配置变化
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), //热加载
    new HTMLWebpackPlugin({
      title: 'Test',
      inject: true,
      filename: 'index.html',
      template: path.join(__dirname, './test/index.ejs'),
    }),
  ],
};

module.exports = merge(configBase, config);
