import React from 'react';
import Route from 'react-router/lib/Route';
import Redirect from 'react-router/lib/Redirect';

import App from './routes/App';
import Login from './routes/Login';
import Logout from './routes/Logout';
import Admin from './routes/Admin';
import Posts from './routes/Posts';
import PostsNew from './routes/PostsNew';
import PostsShow from './routes/PostsShow';
import Tags from './routes/Tags';
import NotFound from './routes/NotFound';

export default (
	<Route component={App}>
		<Route path="login" component={Login} />
		<Route path="logout" component={Logout} />
		<Route component={Admin}>
			<Route path="posts/new" component={PostsNew} />
			<Route path="posts" component={Posts}>
				<Route path=":id" component={PostsShow} />
			</Route>
			<Route path="tags" component={Tags} />
		</Route>
		<Redirect from="/" to="posts" />
		<Route path="*" component={NotFound} />
	</Route>
);
