module.exports = {
	path: 'tags',
	getComponent(location, cb) {
		require.ensure([], require => {
			cb(null, require('./Tags'))
		});
	}
}