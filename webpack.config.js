const HtmlWebPackPlugin = require('html-webpack-plugin')
const { join } = require('path')

module.exports = {
  entry: './src/demo/index',
  output: {
    path: join(__dirname, 'docs'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: 'docs/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/demo/index.html',
      filename: './index.html',
    }),
  ],
}
