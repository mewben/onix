import { CALL_API } from 'redux-api-middleware'
import { get, post } from 'utils/network'

export const savePost = (payload, status) => {
	let request = post('/posts?status=' + status, payload)

	request.types = ['POST_SAVE_REQ', 'POST_SAVE_SUCC', 'NOTIF_FAIL']

	return { [CALL_API]: request }
}

export const fetchPost = (id) => {
	return (dispatch, getState) => {
		if (getState().post.getIn(['item', 'id']) === id) {
			// do not fetch if already fetched
			return Promise.resolve()
		}

		let request = get('/posts/' + id)
		request.types = ['NOOP', 'POST_SAVE_SUCC', 'NOTIF_FAIL']

		return dispatch({
			[CALL_API]: request,
		})
	}
}
