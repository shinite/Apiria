var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'regenerator-runtime/runtime',
    './src/app.js'
  ],
  externals:{
    jquery:'jQuery'
  },
  plugins:[
    new webpack.ProvidePlugin({
      '$':'jquery',
      'jQuery':'jquery'
    })
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },

  module:{
     rules:[{
       loader: 'babel-loader',
       test:/\.js$/,
       exclude:/node_modules/
     },{
       test:/\.s?css$/,
       use:[
         'style-loader',
         'css-loader',
         'sass-loader'
       ]
     }]
  }
};
