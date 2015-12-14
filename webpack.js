var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve('./server/static/js/');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

var config = {
  entry: ['./server/static/jsx/main.jsx'],
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  devtool: 'source-map',
  output: {
    path: buildPath,  
    filename: 'main.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: [path.resolve(__dirname, "/server/static/")],
        exclude: [nodeModulesPath]
      },
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/, 
        loader: 'babel-loader?optional=runtime&stage=0', 
        exclude: [nodeModulesPath]
      }
    ]
  },
  eslint: {
    configFile: '.eslintrc'
  },
};

module.exports = config;
