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
        test: /\.ts(x?)$/,
        enforce: 'pre',
        use: [
          {
            loader: 'ts-loader'
          },
          {
             loader: require.resolve( 'tslint-loader' ),
             options: {
              tsConfigFile: 'tsconfig.json',
              failOnHint: false,
              typeCheck:true,
              fix: true
             }
          },
          {
            loader: 'import-glob'
          }
        ],
        exclude: /node_modules/
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
