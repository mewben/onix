import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import app from './App'
import post, { postModel, postForm } from './Post'
// import user, { loginModel, loginForm, changePasswordModel, changePasswordForm, changeSemModel, changeSemForm } from './User'

export default combineReducers({
	// main reducers
	app,
	// user,
	post,

	// model reducers
	// loginModel,
	postModel,

	// form reducers
	// loginForm,
	postForm,

	// others
	routing
})
