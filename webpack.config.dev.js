var path = require('path');
var webpack = require('webpack');
var precss = require('precss');
var postcssImport = require('postcss-import');

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: [
		// Temporary fix for stateless components not hot-reloading
		'webpack-hot-middleware/client',
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
		extensions: ['', '.js', '.jsx', '.scss'],
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
				include: __dirname + '/admin/src'
			}
		],
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['babel-loader'],
				exclude: /node_modules/,
				include: __dirname + '/admin/src'
			}, {
				test: /\.scss$/,
				loader: 'style-loader!css-loader!postcss-loader'
			}
		]
	},
	postcss: function(webpack) {
		return [
			postcssImport({addDependencyTo: webpack}),
			precss
		];
	}
};
