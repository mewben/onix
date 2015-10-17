module.exports = {
	path: 'new',
	getComponent(location, cb) {
		require.ensure([], require => {
			cb(null, require('./PostsNew'))
		});
	}
}