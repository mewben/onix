import React from 'react'
import Route from 'react-router/lib/Route'
// import Redirect from 'react-router/lib/Redirect'

import App from 'containers/App'
import Login from 'routes/Login'
// import Logout from 'routes/Logout'
import Admin from 'containers/Admin'
// import Posts from 'routes/Posts'
import PostsNew from 'containers/Posts/new'
import PostsEdit from 'containers/Posts/edit'
// import PostsShow from 'routes/PostsShow'
// import Tags from 'routes/Tags'
import NotFound from 'routes/NotFound'

export default function routes(store) {
	return (
		<Route component={App}>
			<Route path="login" component={Login} />
			<Route path="/" component={Admin}>
				<Route path="posts/new" component={PostsNew} onEnter={PostsNew.onEnter(store)} />
				<Route path="posts/:id/edit" component={PostsEdit} onEnter={PostsEdit.onEnter(store)} />
			</Route>
			<Route path="*" component={NotFound} />
		</Route>
	)
}
