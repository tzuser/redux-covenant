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
    globalObject: 'this',
    library: 'redux-covenant', // string,
    libraryTarget: 'umd', // univ
  },
  externals: {
    redux: 'redux',
    react: 'react',
    'react-dom': 'react-dom',
    'react-redux': 'react-redux',
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
