const path = require('path');
const {
  WranglerJsCompatWebpackPlugin,
} = require("wranglerjs-compat-webpack-plugin");
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.yaml$/,
        include: path.resolve('src/functions/'),
        loader: 'yaml',
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