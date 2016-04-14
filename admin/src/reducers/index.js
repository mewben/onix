import { combineReducers } from 'redux';

import app from './App';
import content from './Content';

const rootReducer = combineReducers({
	app,
	content
});

export default rootReducer;