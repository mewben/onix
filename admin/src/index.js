import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Router from 'react-router/lib/Router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import useBasename from 'history/lib/useBasename';
import injectTapEventPlugin from 'react-tap-event-plugin';


import configureStore from './store/configureStore';
import routes from './routes';

const store = configureStore();
const history = useBasename(createBrowserHistory)({
	basename: '/admin'
});

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


render(
	<Provider store={store}>
		<Router
			routes={routes}
			history={history}
		/>
	</Provider>,
	document.getElementById('app')
);