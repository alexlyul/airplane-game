const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const rimraf = require('rimraf');
rimraf.sync('/dist');


module.exports = {
  entry: './main.js',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  
  module: {
    rules: [
      {
        test: /\.js/,
        use: [{loader: 'babel-loader'}],
        exclude: /node_modules/
      },
    ]
  },
  
  plugins: [
    new HtmlWebpackPlugin({template: './index.html'})
  ],
  
  devServer: {
    watchOptions: {
      ignored: [
        path.resolve(__dirname, 'dist'),
        path.resolve(__dirname, 'node_modules')
      ]
    }
  },
}