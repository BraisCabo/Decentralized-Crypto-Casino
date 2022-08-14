const path = require('path')

const config = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js',
    },
    devServer: {
        static: path.resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
      },
      devtool: 'source-map',
    module: {
      rules: [
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