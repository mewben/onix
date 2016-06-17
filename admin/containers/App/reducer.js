import { fromJS } from 'immutable'
import nprogress from 'nprogress'

import { removeStorage, setLoginStorage, setRefreshStorage } from 'utils/storage'
import { catchErr } from 'utils/helpers'

let initialState = fromJS({
	time: '',
	error: '',
	loading: false,
	me: {},
	isLoggedIn: 0,
	session: {},
	session_changed: false, // refresh if this turns to true
	notif: {
		title: '',
		message: '',
		level: 'success',
		position: 'bc',
		autoDismiss: 5,
		dismissible: true,
		action: null,
		actionState: false,
		show: false,
	},
})

try {
	let me = localStorage.getItem('me')
	if (me) {
		initialState = initialState
			.set('me', fromJS(JSON.parse(me)))
	}
} catch (e) {
	catchErr(e)
}

export default function app(state = initialState, action) {
	const pending = /.*_REQ$/
	const failed = /.*_FAIL$/
	const succeeded = /.*_SUCC$/

	// global action match
	if (action.type.match(pending)) {
		nprogress.start()
		// show notification error if PREFLIGHT throws error
		if (action.error) {
			nprogress.done()
			return state
				.set('error', action.payload.message)
				.set('loading', false)
				.set('notif', state.get('notif').merge(fromJS({
					message: action.payload.message,
					show: true,
					level: 'error',
				})))
		}
	}

	if (action.type.match(failed)) {
		nprogress.done()

		if (action.payload.status === 401) {
			try {
				removeStorage()
			} catch (e) {
				catchErr(e)
			}
			return state.set('isLoggedIn', 0)
		}
	}

	if (action.type.match(succeeded)) {
		nprogress.done()
	}

	switch (action.type) {

		case 'POST_SAVE_SUCC':
		case 'TAG_SAVE_SUCC':
		case 'NOTIF_SUCC':
			let success = 'Action successful.'
			if (action.meta && 'msg' in action.meta) {
				success = action.meta.msg
			}
			return state
				.set('loading', false)
				.set('notif', state.get('notif').merge(fromJS({
					message: success,
					show: true,
					level: 'success',
				})))

		case 'NOTIF_FAIL':
			let msg = action.payload.message
			if (action.payload.response && action.payload.response.hasOwnProperty('Error')) {
				msg = action.payload.response.Error
			}
			return state
				.set('loading', false)
				.set('notif', state.get('notif').merge(fromJS({
					message: msg,
					show: true,
					level: 'error',
				})))

		case 'NOTIF_HIDE':
			return state.setIn(['notif', 'show'], false)

		case 'AUTH_REQ':
			return state
				.set('error', '')
				.set('loading', true)

		case 'AUTH_FAIL':
			return state
				.set('error', action.payload.response.Error)
				.set('loading', false)

		case 'AUTH_SUCC':
			try {
				setLoginStorage(action.payload)
			} catch (e) {
				catchErr(e)
			}
			return state
				.set('me', fromJS(action.payload.me))
				.set('session', fromJS(action.payload.session))
				.set('loading', false)

		case 'AUTH_REFRESH':
			try {
				setRefreshStorage(action.payload)
			} catch (e) {
				catchErr(e)
			}
			return state.set('me', fromJS(action.payload.me))

		case 'AUTH_OUT':
			try {
				removeStorage()
			} catch (e) {
				catchErr(e)
			}
			return state

		case 'TIME':
			return state.set('time', action.payload)

		default:
			return state
	}
}
