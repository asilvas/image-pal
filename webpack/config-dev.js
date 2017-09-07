const path = require('path');

module.exports = {
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
            presets: ['env'],
            plugins: [require('babel-plugin-transform-object-rest-spread')]
          }
        }
      }
    ]
  },
  devtool: 'cheap-module-source-map'
}
