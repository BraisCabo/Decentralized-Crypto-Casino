const path = require('path')
const { CheckCaseWebpackPlugin } = require('check-case-webpack-plugin');

const config = {
  ignoreWarnings: [
    (warning) => false
  ],
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              options: {
                bypassOnDebug: true, // webpack@1.x
                disable: true, // webpack@2.x and newer
              },
            },
          ],
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
      ],
    },
  }

module.exports = config