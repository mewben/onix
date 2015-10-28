import ContentIndex from './ContentIndex';

module.exports = {
	path: 'content',

	indexRoute: { component: ContentIndex },
	getComponent(location, cb) {
		require.ensure([], require => {
			cb(null, require('./Content'))
		});
	},
	getChildRoutes(location, cb) {
		require.ensure([], require => {
			cb(null, [
				require('./routes/ContentNew')
			]);
		});
	}
}