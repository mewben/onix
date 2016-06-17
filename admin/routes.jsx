import React from 'react'
import Route from 'react-router/lib/Route'
import IndexRoute from 'react-router/lib/IndexRoute'
import IndexRedirect from 'react-router/lib/IndexRedirect'

import App from 'containers/App'
import Login from 'containers/Login'
import Logout from 'containers/Logout'
import Admin from 'containers/Admin'
import Posts from 'containers/Posts'
import PostsList from 'containers/Posts/list'
import PostsNew from 'containers/Posts/new'
import PostsEdit from 'containers/Posts/edit'
// import PostsShow from 'routes/PostsShow'
import Tags from 'containers/Tags'
import TagsNew from 'containers/Tags/new'
import TagsList from 'containers/Tags/list'
import TagsEdit from 'containers/Tags/edit'

import NotFound from 'routes/NotFound'

import auth from 'containers/Admin/onEnter'

export default function routes(store) {
	return (
		<Route component={App}>
			<Route path="login" component={Login} />
			<Route path="logout" component={Logout} onEnter={Logout.onEnter(store)} />
			<Route path="/" component={Admin} onEnter={auth(store)}>
				<Route path="posts" component={Posts}>
					<IndexRoute component={PostsList} onEnter={PostsList.onEnter(store)} />
					<Route path="new" component={PostsNew} onEnter={PostsNew.onEnter(store)} />
					<Route path=":id/edit" component={PostsEdit} onEnter={PostsEdit.onEnter(store)} />
				</Route>
				<Route path="tags" component={Tags}>
					<IndexRoute component={TagsList} onEnter={TagsList.onEnter(store)} />
					<Route path="new" component={TagsNew} />
					<Route path=":id/edit" component={TagsEdit} onEnter={TagsEdit.onEnter(store)} />
				</Route>
				<IndexRedirect from="/" to="posts" />
			</Route>
			<Route path="*" component={NotFound} />
		</Route>
	)
}
