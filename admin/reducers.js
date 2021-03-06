import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import app from 'containers/App/reducer'
// import entities from 'containers/Admin/reducer'
import { loginModel, loginForm } from 'containers/Login/reducer'
import post, { postModel, postForm } from 'containers/Posts/reducer'
import tag, { tagModel, tagForm } from 'containers/Tags/reducer'
// import { changePasswordModel, changePasswordForm } from 'containers/Account/reducer'

export default combineReducers({
	// main reducers
	app,
	// entities,
	post,
	tag,

	// model reducers
	loginModel,
	postModel,
	tagModel,
	// changePasswordModel,
	// changeSemModel,

	// form reducers
	loginForm,
	postForm,
	tagForm,
	// changePasswordForm,
	// changeSemForm,

	// others
	routing,
})
