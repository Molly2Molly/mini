const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');

module.exports = merge(common, {
	mode: "development",
	devtool: 'inline-source-map',
	devServer: {
  	contentBase:'./dist',
  	hot: true
  },
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    // for webpack-dev-middleware
    // publicPath: '/',
  },
  plugins: [
  	new webpack.NamedModulesPlugin(),
  	new webpack.HotModuleReplacementPlugin(),
  	new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
  ],
  module: {
  	rules: [
  		{
	      test: /\.less$/,
	      use: [
		      {
	        	loader: 'style-loader' // creates style nodes from JS strings
	      	}, 
	      	{
	        	loader: 'css-loader' // translates CSS into CommonJS
	      	}, 
	      	{
	        	loader: 'less-loader',options: { // compiles Less to CSS
	          	strictMath: false,
	          	//noIeCompat: false
	        	}
	      	}, 
	      	{
	        	loader: 'postcss-loader',options: {
	          	sourceMap: false,
	            plugins: () => [autoprefixer({ browsers: ['> 1%','last 3 versions','ie >= 6','Firefox >= 20','Chrome >= 20','Safari >=2','Opera >=20','iOS >= 7', 'Android >= 4.1'] })],
	        	}
	      	}
      	]
	    },
	  	{
	  	  test: /\.css$/,
	  	  use: [
	  		  'style-loader',
	  		  'css-loader',
	  		  {
	        	loader: 'postcss-loader',options: {
	          	sourceMap: false,
	            plugins: () => [autoprefixer({ browsers: ['> 1%','last 3 versions','ie >= 6','Firefox >= 20','Chrome >= 20','Safari >=2','Opera >=20','iOS >= 7', 'Android >= 4.1'] })],
	        	}
	      	}
	  	  ]
	  	}
  	]
  }
});
