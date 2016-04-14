import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import rootReducer from '../reducers';

let middleware = [promiseMiddleware()];

// only add logger if dev mode
if (process.env.NODE_ENV !== 'production') {
	let createLogger = require('redux-logger');
	const loggerMiddleware = createLogger();
	middleware = [...middleware, loggerMiddleware];
}

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

export default function configureStore(initialState) {
	const store = createStoreWithMiddleware(rootReducer, initialState);

	if (module.hot) {
		console.log('HOT HOT HOT');
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers');
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}