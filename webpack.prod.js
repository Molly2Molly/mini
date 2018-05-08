const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const autoprefixer = require('autoprefixer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
	mode: "production",
	devtool: 'source-map',
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
  	new MiniCssExtractPlugin({
      filename: "[name].css",
      //chunkFilename: "[id].css"
    }),
    // --optimize-minimize
    new UglifyJsPlugin({
      sourceMap: false
    }),
    // --define process.env.NODE_ENV="'production'"
    new webpack.DefinePlugin({
       'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  optimization: {
  	minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
    	//chunks: "all",
      cacheGroups: {
	      vender: {
	      	name: "vender",
	      	//chunks: "initial",
	        chunks: "all",
	        enforce: true,
	        priority: 0,
	        test: /[\\/]node_modules[\\/]/,
			    // test(module, chunks) {
			    //     return chunks.some(chunk => chunk.name === 'vender');
			    // }
	      },
	      // Extracting all CSS in a single file
        styles: {
          name: 'styles',
          test: /\.(css|less)$/,
          chunks: 'all',
          enforce: true,
          priority: 1,
        },
      }
    }
  },
  module: {
  	rules: [
  		{
	      test: /\.less$/,
	      use: [
		      {
	        	loader: 'style-loader' // creates style nodes from JS strings
	      	}, 
	      	MiniCssExtractPlugin.loader,
	      	{
	        	loader: 'css-loader' // translates CSS into CommonJS
	      	}, 
	      	{
	        	loader: 'less-loader',options: { // compiles Less to CSS
	          	strictMath: true,
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
	  		  MiniCssExtractPlugin.loader,
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