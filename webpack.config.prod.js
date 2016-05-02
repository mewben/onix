var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: [
		'./admin/src/index'
	],
	output: {
		path: path.join(__dirname, 'public', 'admin', 'assets'),
		filename: 'bundle.min.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.scss'],
		alias: {
			styles: path.resolve(__dirname, 'admin', 'assets', 'styles'),
			root: __dirname
		}
	},
	plugins: [
		new ExtractTextPlugin('main.min.css'),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		})
	],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['babel-loader'],
				exclude: /node_modules/,
				include: path.join(__dirname, 'admin', 'src')
			}, {
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
			}, {
				test: /\.json$/,
				loader: 'json-loader'
			}
		]
	}
};
