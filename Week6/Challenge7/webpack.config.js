const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js',
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001/',
        secure: false
      }
    }
  },

  module: {
    rules: [
      {test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'}
        ],
      },
      { test: /\.(png|woff|woff2|eot|otf|ttf|svg)$/,
        use: [
        {loader: 'url-loader?limit=100000' },
        {loader: 'file-loader'}
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },

  plugins: [HtmlWebpackPluginConfig],
};
