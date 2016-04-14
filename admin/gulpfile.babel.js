var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps');

const devServer = () => {
	require('./devServer.js');
}

gulp.task('sass', () => {
	return gulp.src('assets/scss/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('admin/build'));
});

gulp.task('sass:build', () => {
	return gulp.src('assets/scss/main.scss')
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(autoprefixer())
		.pipe(gulp.dest('admin/build'));
});


gulp.task('sass:watch', () => {
	gulp.watch('assets/scss/**/*.scss', ['sass']);
});

gulp.task('dev', [], done => devServer());

gulp.task('build', ['sass:build']);

gulp.task('default', ['dev', 'sass', 'sass:watch']);