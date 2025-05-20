const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const {
  WranglerJsCompatWebpackPlugin,
} = require("wranglerjs-compat-webpack-plugin");
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.ya?ml$/,
        oneOf: [
          {
            resourceQuery: /stream/,
            options: { asStream: true },
            loader: 'yaml-loader'
          },
          { loader: 'yaml-loader' }
        ]
      }
    ]
  }
}