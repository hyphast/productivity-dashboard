const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const paths = require('./paths')

module.exports = {
  target: 'browserslist',
  entry: {
    main: [paths.src + '/index.tsx'],
  },
  output: {
    path: paths.dist,
    publicPath: '/',
    filename: '[name].bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Productivity Dashboard',
      template: paths.public + '/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: '.',
          globOptions: {
            ignore: ['*.DS_Store', 'desktop.ini', '**/*.html'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    new Dotenv(),
  ],
  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': paths.src,
    },
  },
}
