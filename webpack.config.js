const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	// for webpack-dev-middleware webpack-hot-middleware
  // entry: [
  // 	'./src/js/index.js',
  // 	'webpack-hot-middleware/client'
  // ],
  entry: {
  	app: './src/js/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    // for webpack-dev-middleware
    // publicPath: '/',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
  	contentBase:'./dist',
  	hot: true
  },
  // development  production
  mode: "development",
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [
  	new CleanWebpackPlugin(['dist']),
  	new HtmlWebpackPlugin({
  		template: 'src/templates/index.html'
  	}),
  	new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  	new webpack.NamedModulesPlugin(),
  	new webpack.HotModuleReplacementPlugin()
  ],
  module: {
  	rules: [
  		{
	      test: /\.less$/,
	      use: [
		      {
	        	loader: 'style-loader' // creates style nodes from JS strings
	      	}, 
	      	// MiniCssExtractPlugin.loader,
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
	          	sourceMap: true,
	            plugins: () => [autoprefixer({ browsers: ['> 1%','last 3 versions','iOS >= 7', 'Android >= 4.1','ie >= 6','Firefox >= 20','Chrome >= 20','Safari >=2','Opera >=20'] })],
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
	          	sourceMap: true,
	            plugins: () => [autoprefixer({ browsers: ['> 1%','last 3 versions','iOS >= 7', 'Android >= 4.1','ie >= 6','Firefox >= 20','Chrome >= 20','Safari >=2','Opera >=20'] })],
	        	}
	      	}
	  	  ]
	  	},
	  	{
	      test: /\.(png|svg|jpg|gif)$/,
	      use: [
	      	'file-loader',
	      	{
			      loader: 'image-webpack-loader',
			      options: {
			        mozjpeg: {
			          progressive: true,
			          quality: 65
			        },
			        // optipng.enabled: false will disable optipng
			        optipng: {
			          enabled: false,
			        },
			        pngquant: {
			          quality: '65-90',
			          speed: 4
			        },
			        gifsicle: {
			          interlaced: false,
			        },
			        // the webp option will enable WEBP
			        webp: {
			          quality: 75
			        }
			      }
			    }
	      ]
	    },
	    {
       	test: /\.(woff|woff2|eot|ttf|otf)$/,
       	use: [
         	'file-loader'
       	]
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      }
  	]
  }
};