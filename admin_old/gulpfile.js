var gulp = require('gulp');
var gutil = require('gulp-util');
var rimraf = require('rimraf');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var webpackConfigDev = require('./config/webpack.development');
var webpackConfigProd = require('./config/webpack.production');

// ============ webpack-dev-server
gulp.task('webpack-dev-server', function() {
	new WebpackDevServer(webpack(webpackConfigDev), {
		publicPath: webpackConfigDev.output.publicPath,
		historyApiFallback: true,
		stats: {
			colors: true
		},
		hot: true
	}).listen(1310, '', function(err) {
		gutil.log("[webpack-dev-server]", "http://localhost:1310");
	});
});

// ============ webpack-build
gulp.task('webpack-build', function() {
	webpack(webpackConfigProd, function(err, stats) {
		if (err) throw new gutil.PluginError("webpack-build", err);
		gutil.log("[webpack-build]", stats.toString({colors: true}));
	});
});

// ============ sass / scss
gulp.task('sass', function() {

	// TinyMCE
	gulp.src('assets/scss/tinymce/*.scss')
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(gulp.dest('admin/build/tinymce'));
/*
	gulp.src('assets/scss/skin.min.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('admin/build'));

	gulp.src('assets/scss/content.min.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('admin/build'));
*/
	return gulp.src('assets/scss/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('admin/build'));
});

// ============ sass-build
gulp.task('sass-build', function() {
	gulp.src('assets/scss/skin.min.scss')
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(autoprefixer())
		.pipe(gulp.dest('admin/build'));

	gulp.src('assets/scss/content.min.scss')
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(autoprefixer())
		.pipe(gulp.dest('admin/build'));

	return gulp.src('assets/scss/main.scss')
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(autoprefixer())
		.pipe(gulp.dest('admin/build'));
});

// ============ sass-watch for scss files
gulp.task('sass-watch', function() {
	gulp.watch('assets/scss/**/*.scss', ['sass']);
});


// ============ clean
gulp.task('clean', function(cb) {
	rimraf('./admin/build', cb);
});

// ============ build
gulp.task('build', ['clean', 'sass-build', 'webpack-build']);

// ============ default
gulp.task('default', ['clean', 'sass', 'webpack-dev-server', 'sass-watch']);