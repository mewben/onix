import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';

// routes
import App from './routes/App';
import Login from './routes/Login';

// Admin
import Admin from './routes/Admin';
import Dashboard from './routes/Dashboard';

// Content
import Content from './routes/Content/Content';
import ContentIndex from './routes/Content/ContentIndex';
import ContentNew from './routes/Content/ContentNew';

export default (
	<Route component={App}>
		<Route path="login" component={Login} />
		<Route path="/" component={Admin}>
			<IndexRoute component={Dashboard} />
			<Route path="content" component={Content}>
				<IndexRoute component={ContentIndex} />
				<Route path="new" component={ContentNew} />
			</Route>
		</Route>
	</Route>
);