const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path');

const srcPath = path.resolve(__dirname, 'public');
const dstPath = path.resolve(__dirname, 'dist/public');

module.exports = {
  entry: `${srcPath}/index.js`,  // assets/js/index.js`,
  output: {
    filename: 'assets/js/bundle.js',
    path: dstPath,
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { context: srcPath, from: `index.html`, to: dstPath},
      { context: srcPath, from: `assets/images/*.png`, to: dstPath},
    ]),
    new VueLoaderPlugin(),
  ],
};
