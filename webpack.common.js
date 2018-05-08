const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	// for webpack-dev-middleware webpack-hot-middleware
  // entry: [
  // 	'./src/index.js',
  // 	'webpack-hot-middleware/client'
  // ],
  entry: {
  	polyfill : 'babel-polyfill',
  	app: './src/index.js',
  	//another: './src/js/another-module.js'
  	//vender : ['lodash','d3']
  },
  plugins: [
  	new CleanWebpackPlugin(['dist']),
  	new HtmlWebpackPlugin({
  		template: 'src/templates/index.html'
  	})
  ],
  module: {
  	rules: [
  		{
        test: /\.js$/,
        exclude: /node_modules/, 
        loader: "babel-loader"
      },
	  	{
	      test: /\.(png|jpg|gif|svg)$/,
	      //exclude: path.resolve(__dirname, 'src/svg/'), 
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