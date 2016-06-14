import { authLogout } from 'containers/App/actions'

const Logout = () => (null)

Logout.onEnter = (store) => {
	return (nextState, replace, cb) => {
		console.log('"crash"')
		store.dispatch(authLogout())
			.then(() => {
				// hard refresh to /login
				window.location.href = '/admin/login'
			})
	}
}

export default Logout
