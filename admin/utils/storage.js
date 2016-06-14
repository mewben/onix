import moment from 'moment'

const setJWTExp = (jwt_exp) => {
	// in milliseconds // subtract 1 minute to refresh 1 minute ahead
	localStorage.setItem('jwt_exp', moment().add(jwt_exp, 'm').subtract(30, 's').valueOf())
}

const setStorage = (data) => {
	localStorage.setItem('me', JSON.stringify(data.me))
	localStorage.setItem('jwt', data.jwt)
	localStorage.setItem('rft', data.rft)
	localStorage.setItem('isLoggedIn', data.me.id)
	setJWTExp(data.jwt_exp)
}

export const setLoginStorage = (data) => {
	setStorage(data)
}

export const removeStorage = () => {
	// remove items from localStorage
	localStorage.removeItem('me')
	localStorage.removeItem('jwt')
	localStorage.removeItem('rft')
	localStorage.removeItem('jwt_exp')
	localStorage.removeItem('isLoggedIn')
}

export const setRefreshStorage = (data) => {
	// everything except session
	setStorage(data)
}
