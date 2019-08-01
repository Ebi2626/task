require('babel-polyfill');
require('whatwg-fetch');

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: [ 
    'babel-polyfill',
    'whatwg-fetch',
    './js/main.js' 
  ],
  output: {
    path: path.resolve(__dirname, ''),
    filename: 'main.bundle.js'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [ 'style-loader', 
        MiniCssExtractPlugin.loader, 
        {
          loader: 'css-loader',
          options: {
            url: false,
          },
        },
        'postcss-loader',
        'sass-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist', {} ),
    new MiniCssExtractPlugin({
      filename: 'style.bundle.css',
    })
  ]
};