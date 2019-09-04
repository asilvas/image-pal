const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    rgb: './webpack/rgb.js',
    hsluv: './webpack/hsluv.js'
  },
  output: {
    filename: 'image-pal-[name].js',
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
  devtool: 'cheap-module-source-map'
}
