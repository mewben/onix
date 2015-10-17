import PostsIndex from './PostsIndex';
//import PostsNew from './PostsNew';

module.exports = {
	path: 'posts',

	indexRoute: { component: PostsIndex },
	getComponent(location, cb) {
		require.ensure([], require => {
			cb(null, require('./Posts'))
		});
	},
	getChildRoutes(location, cb) {
		require.ensure([], require => {
			cb(null, [
				require('./routes/PostsNew')
			]);
		});
	}
}