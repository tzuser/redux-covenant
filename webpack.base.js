const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].js',
    library: 'react-covenant', // string,
    libraryTarget: 'umd', // univ
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: require.resolve('babel-loader'),
          },
        ],
      },
    ],
  },
  context: path.resolve(__dirname, 'src'),
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.scss', '.css'],
    modules: ['node_modules'],
  },
  plugins: [],
};
