import { authDelegate } from 'containers/App/actions'
import { catchErr } from 'utils/helpers'

// admin onEnter
const auth = (store) => {
	return (nextState, replace, cb) => {
		try {
			// Check if logged in
			if (!localStorage.getItem('isLoggedIn')) {
				replace('/login')
				return cb()
			}

			// Check if jwt_exp is expired
			let jwt_exp = localStorage.getItem('jwt_exp')
			let now = Date.now()
			if (jwt_exp < now) {
				// if expired, try to refresh token
				store.dispatch(authDelegate())
					.then(() => cb())
			} else {
				// not expired
				// compute offset from jwt_expiry
				let offset = jwt_exp - now
				// setTimeout from that offset
				setTimeout(() => {
					// dispatch refresh token
					store.dispatch(authDelegate())
				}, offset)
				return cb()
			}
		} catch (e) {
			catchErr(e)
		}
	}
}

export default auth

// Scenario
/*
	Upon Login
		- POST /auth/login
			(AUTH_LOGIN)
		- setTimeout to schedule next auth
		- next auth will be POST /auth/delegation
		- returns perhaps new jwt_exp so setTimeout to next auth based on that jwt_exp

	Upon refresh page
		- check onEnter, check if jwt_exp is expired
		- if expired, try refreshing POST /auth/delegation
			- if fails, redirect to /login
			- if success, schedule next auth
		- if not expired, compute offset of the current jwt_exp till next auth
		- setTimeout using that offset to call to /auth/delegation
		- returns perhaps new jwt_exp so setTimeout to next auth based on that jwt_exp
*/
