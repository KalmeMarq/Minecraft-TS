import path from 'path'
import CopyPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import sass from 'node-sass';
import WebpackPwaManifest from 'webpack-pwa-manifest'
import { GenerateSW } from 'workbox-webpack-plugin';

module.exports = {
  entry: path.resolve(__dirname, './src/client/index.ts'),
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /\.worker\.ts$/,
        use: { loader: "worker-loader" },
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
          from: path.join(__dirname, '/style.scss'),
          to: './style.css',
          transform (content, path) {
            const result = sass.renderSync({
              file: path
            });
  
            return result.css.toString();
          }
        },
        { from: path.join(__dirname, 'minecraftia.woff'), to: './minecraftia.woff' },
        { from: path.join(__dirname, 'config.json'), to: './config.json' }
      ]
    }),
    new WebpackPwaManifest({
      name: 'MCTS',
      short_name: 'mcts',
      description: '',
      background_color: '#333333',
      crossorigin: 'use-credentials',
      start_url: 'http://localhost:8000',
      display: 'fullscreen',
      icons: [
        {
          src: path.resolve('icon.png'),
          sizes: [96, 128, 192, 256, 384, 512]
        }
      ]
    })
  ]
}
