const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { merge } = require('webpack-merge')

const commonConfig = require('./webpack.common')
const paths = require('./paths')

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    port: 3000,
    historyApiFallback: true,
    compress: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
              modules: {
                auto: /\.module\.\w+$/i,
                exportGlobals: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                localIdentContext: paths.src,
              },
            },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [new ReactRefreshWebpackPlugin()],
})
