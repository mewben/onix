import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import rootReducer from '../reducers';

export default function configureStore(initialState) {
	return createStore(
		rootReducer,
		initialState,
		applyMiddleware(
			thunk,
			promiseMiddleware({
				promiseTypeSuffixes: ['P', 'S', 'F']
			})
		)
	);
};
