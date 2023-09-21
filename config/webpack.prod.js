const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { merge } = require('webpack-merge')

const commonConfig = require('./webpack.common')
const paths = require('./paths')

module.exports = merge(commonConfig, {
  mode: 'production',
  devtool: false,
  output: {
    filename: 'js/[name].[contenthash].bundle.js',
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), '...'],
    runtimeChunk: {
      name: 'runtime',
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
              modules: {
                auto: /\.module\.\w+$/i,
                exportGlobals: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                exportLocalsConvention: 'camelCase',
                localIdentContext: paths.src,
              },
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 7 * 1024,
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
  ],
})
