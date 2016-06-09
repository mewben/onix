import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import app from 'containers/App/reducer'
// import { loginModel, loginForm } from 'containers/Login/reducer'
import post, { postModel, postForm } from 'containers/Posts/reducer'
import tag from 'containers/Tags/reducer'
// import { changePasswordModel, changePasswordForm } from 'containers/Account/reducer'

export default combineReducers({
	// main reducers
	app,
	post,
	tag,

	// model reducers
	// loginModel,
	postModel,
	// changePasswordModel,
	// changeSemModel,

	// form reducers
	// loginForm,
	postForm,
	// changePasswordForm,
	// changeSemForm,

	// others
	routing,
})
