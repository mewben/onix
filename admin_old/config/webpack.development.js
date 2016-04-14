var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'inline-source-map',
	target: 'web',
	entry: [
		'webpack-dev-server/client?http://localhost:1310',
		'webpack/hot/only-dev-server',
		'./src/index'
	],
	output: {
		path: __dirname + '/admin/build/',
		filename: 'bundle.js',
		chunkFilename: '[id].chunk.js',
		publicPath: '/admin/build/'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin('common.js'),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
			}
		})
	],
	resolve: {
		extensions: ['', '.js', '.jsx'],
		alias: {
			config: path.join(__dirname, 'development')
		}
	},
	eslint: {
		configFile: './.eslintrc',
		emitError: true,
		emitWarning: true,
		failOnError: true
	},
	module: {
  		// Shut off warnings about using pre-built javascript files
  		// as Quill.js unfortunately ships one as its `main`.
  		noParse: /node_modules\/quill\/dist/,
		preLoaders: [
			{
				test: /\.jsx?$/,
				loader: 'eslint-loader',
				exclude: /node_modules/
			}
		],
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: [
					'react-hot',
					'babel?loose=all'
				],
				exclude: /node_modules/
			},{
				include: require.resolve( 'tinymce/tinymce' ),
				loader: 'exports?window.tinymce',
			},{
				include: /node_modules\/tinymce/,
				loader: 'imports?this=>window',
			}
		]
	}
};