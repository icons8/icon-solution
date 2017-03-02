const
  path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin')
;

const config = {

  entry: path.resolve(__dirname, './src/index.js'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
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
    contentBase: path.resolve(__dirname, 'dist')
  },

  watchOptions: {
    ignored: /node_modules/
  }
};

module.exports = config;