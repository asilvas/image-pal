const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    rgb: './webpack/rgb.js',
    hsluv: './webpack/hsluv.js'
  },
  output: {
    filename: 'image-pal-[name].min.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [require('@babel/plugin-proposal-object-rest-spread')]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
}
