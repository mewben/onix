module.exports = {
	path: 'edit/:id',
	getComponent(location, cb) {
		require.ensure([], require => {
			cb(null, require('./ContentEdit'));
		});
	}
}