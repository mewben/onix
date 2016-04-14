/* -------------------------
 * Gulp + Go Live Code Reload
 * From https://gist.github.com/squidfunk/120b6f02927fdc9ef9f1
 * ------------------------- */
var executable = 'onix';
var server = null;

var child = require('child_process');
var gulp = require('gulp');
var notifier = require('node-notifier');
var reload = require('gulp-livereload');
var sync = require('gulp-sync')(gulp).sync;
var util = require('gulp-util');

/*
 * DEFAULT Task
 */
gulp.task('default', ['watch']);


// Watch
gulp.task('watch', [
	'server:build'
], function() {
	reload.listen(11300);
	return gulp.start([
		'server:watch',
		'server:spawn'
	]);
});

// server:build
gulp.task('server:build', function() {
	var build = child.spawnSync('go', ['install']);
	if (build.stderr.length) {
		var lines = build.stderr.toString()
			.split('\n').filter(function(line) {
				return line.length;
			});
		for (var l in lines)
			util.log(util.colors.red(
				'Error (go install): ' + lines[l]
			));
		notifier.notify({
			title: 'Error (go install)',
			message: lines
		});
	}

	return build;
});

// server:watch
// Watch source changes and restart application server
gulp.task('server:watch', function() {
	// Restart application server on changes other than .go
	gulp.watch([
		'.views/**/*.tmpl',
		'locales/*.json'
	], ['server:spawn']);

	// Rebuild and restart application server on changes .go
	gulp.watch([
		'./**/*.go'
	], sync([
		'server:build',
		'server:spawn'
	], 'server'));
});

// Restart application server
gulp.task('server:spawn', function() {
	if (server)
		server.kill();

	// Spawn application server
	server = child.spawn(executable);

	// Trigger reload upon server start
	server.stdout.once('data', function() {
		reload.reload('/');
	});

	// Pretty print server log output
	server.stdout.on('data', function(data) {
		var lines = data.toString().split('\n');
		for (var l in lines)
			if (lines[l].length)
				util.log(lines[l]);
	});

	// Print errors to stdout
	server.stderr.on('data', function(data) {
		process.stdout.write(data.toString());
	});
});


