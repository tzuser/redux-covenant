const configBase = require('./webpack.base.js');
const merge = require('webpack-merge');

const path = require('path');
const webpack = require('webpack');

const config = {
  context: path.resolve(__dirname, 'src'),
  module: {},
  mode: 'production',
  plugins: [],
};

module.exports = merge(configBase, config);
