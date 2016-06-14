import { CALL_API } from 'redux-api-middleware'
import { authenticate, logout, delegate, get, post } from 'utils/network'

export const getTime = () => {
	let request = get('/time')

	request.types = ['NOOP', 'TIME', 'NOOP']

	return { [CALL_API]: request }
}

// timeout for refresh token
let timeoutID = null

export const authLogin = (credentials) => {
	let request = authenticate(credentials)

	request.types = ['AUTH_REQ', 'AUTH_SUCC', 'AUTH_FAIL']

	return { [CALL_API]: request }
}

export const authLogout = () => {
	clearTimeout(timeoutID)
	let request = logout()

	request.types = ['NOOP', 'AUTH_OUT', 'AUTH_OUT']

	return { [CALL_API]: request }
}

export const authDelegate = () => {
	return (dispatch) => {
		let request = delegate()

		request.types = ['NOOP', 'AUTH_REFRESH', '_FAIL']

		return dispatch({
			[CALL_API]: request,
		}).then((res) => {
			if (!res.error) {
				let sec = ((res.payload.jwt_exp * 60) - 30) * 1000 // subtract 30 seconds for allowance
				timeoutID = setTimeout(() => {
					dispatch(authDelegate())
				}, sec)
			}
		})
	}
}

export const changePassword = (payload) => {
	let request = post('/auth/password', payload)

	request.types = [
		'AUTH_REQ',
		{
			type: 'NOTIF_SUCC',
			meta: { msg: 'Password changed successfully.' },
		},
		'NOTIF_FAIL',
	]

	return { [CALL_API]: request }
}

export const hideNotification = () => ({
	type: 'NOTIF_HIDE',
})
