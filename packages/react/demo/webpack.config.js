const
  path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin')
;

const config = {

  entry: path.resolve(__dirname, './src/Icon.js'),

  module: {
    rules: [{
      test: /\.jsx?$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.sass$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          modules: true,
          localIdentName: '[name]__[local]_[hash:3]'
        }
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          plugins: () => [
            require('autoprefixer')({ grid: false })
          ]
        }
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }]
    }]
  },

  resolve: {
    modules: [
      path.resolve(__dirname, './components')
    ]
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