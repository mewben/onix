var webpack = require('webpack'),
	path = require('path');

module.exports = {
	debug: false,
	target: "web",
	entry: [
		'./src/index'
	],
	output: {
		path: path.normalize(__dirname + '/../admin/build/'),
		filename: 'bundle.js',
		chunkFilename: '[id].chunk.js',
		publicPath: '/admin/build/'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new webpack.optimize.CommonsChunkPlugin('common.js'),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compressor: { warnings: false, screw_ie8: true},
			output: { comments: false}
		}),
		new webpack.NoErrorsPlugin()
	],
	resolve: {
		extensions: ['', '.js', '.jsx'],
		alias: {
			config: path.join(__dirname, 'prod')
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
					'babel'
				],
				exclude: /node_modules/
			}
		]
	}
};