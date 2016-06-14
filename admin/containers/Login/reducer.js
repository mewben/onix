import { modelReducer, formReducer } from 'react-redux-form'

const formLoginState = {
	username: '',
	password: '',
}

const loginModel = modelReducer('loginModel', formLoginState)
const loginForm = formReducer('loginModel', formLoginState)

export {
	loginModel,
	loginForm,
}
