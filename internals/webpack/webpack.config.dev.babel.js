const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// PostCSS plugins
const cssnext = require('postcss-cssnext')
const postcssFocus = require('postcss-focus')
const postcssReporter = require('postcss-reporter')

module.exports = require('./webpack.config.base.babel')({
	// Emit a source map for easier debugging
	devtool: 'cheap-module-eval-source-map',

	// Add hot reloading in development
	entry: [
		'webpack-hot-middleware/client',
		path.join(process.cwd(), 'admin', 'index.jsx'), // start with client/index.jsx
	],

	// don't use hashes in dev mode for better performance
	output: {
		filename: '[name].js',
		chunkFilename: '[name].chunk.js',
	},

	// Load the CSS in a style tag in development
	cssLoaders: 'style-loader!css-loader?sourceMap!postcss-loader!sass-loader?sourceMap',
	// Process the CSS with PostCSS
	postcssPlugins: [
		postcssFocus(), // Add a :focus to every :hover
		cssnext({ // Allow future CSS features to be used, also auto-prefixes the CSS...
			browsers: ['last 2 versions', 'IE > 10'], // ...based on this browser list
		}),
		postcssReporter({ // Posts messages from plugins to the terminal
			clearMessages: true,
		}),
	],

	// Add hot reloading
	plugins: [
		new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
		new webpack.NoErrorsPlugin(),
		new HtmlWebpackPlugin({
			template: 'admin/index.html',
			inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
		}),
	],
})
