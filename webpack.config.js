/****** 
**** Webpack Config
******/

var path = require('path');

var config = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'serve'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }, 
  watch: true
}

module.exports = config;