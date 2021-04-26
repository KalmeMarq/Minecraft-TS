import path from 'path'
import CopyPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

module.exports = {
  entry: path.resolve(__dirname, './src/index.ts'),
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'index.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      hash: true,
      minify: false
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, '/style.css'),
          to: './style.css'
        },
        { from: path.join(__dirname, 'assets/'), to: './assets/' },
        { from: path.join(__dirname, 'config.json'), to: './config.json' }
      ]
    })
  ]
}
