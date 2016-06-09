import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Router from 'react-router/lib/Router'
import useRouterHistory from 'react-router/lib/useRouterHistory'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from 'store/configureStore'
import createRoutes from 'routes'

const store = configureStore()
const browserHistory = useRouterHistory(createBrowserHistory)({
	basename: '/admin',
})
const history = syncHistoryWithStore(browserHistory, store)

render(
	<Provider store={store}>
		<Router routes={createRoutes(store)} history={history} />
	</Provider>,
	document.getElementById('app')
)
