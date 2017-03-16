const path = require('path');

const config = {
  entry: './lib/Icon.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'react-icon.js',
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader'}
    ]
  }
};

module.exports = config;