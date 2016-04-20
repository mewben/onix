var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: [
		// Temporary fix for stateless components not hot-reloading
		'webpack-hot-middleware/client?reload=true',
		'./admin/src/index'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	resolve: {
		extensions: ['', '.js', '.jsx', '.scss', '.css'],
		alias: {
			styles: path.resolve(__dirname, 'admin', 'assets', 'styles')
		}
	},
	module: {
		preLoaders: [
			{
				test: /\.jsx?$/,
				loaders: ['eslint-loader'],
				exclude: /node_modules/,
				include: path.join(__dirname, 'admin', 'src')
			}
		],
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['babel-loader'],
				exclude: /node_modules/,
				include: path.join(__dirname, 'admin', 'src')
			}, {
				test: /\.s?css$/,
				loaders: ['style-loader', 'css-loader', 'sass-loader']
			}
		]
	}
};
