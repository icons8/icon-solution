const
  path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin')
;

const config = {

  entry: path.resolve(__dirname, './src/index.js'),

  module: {
    rules: [{
      test: /\.jsx?$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html')
    })
  ],

  devServer: {
    contentBase: path.resolve(__dirname, './src')
  },

  watchOptions: {
    ignored: /node_modules/
  }
};

module.exports = config;