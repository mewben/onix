
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import app from './App';
import tag from './Tag';

const rootReducer = combineReducers({
	app,
	tag,
	routing
});

export default rootReducer;
