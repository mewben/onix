import { CALL_API } from 'redux-api-middleware'
import { get, post, put } from 'utils/network'

export const fetchTags = (q) => {
	let request = get('/tags', q)

	request.types = ['NOOP', 'TAG_GET_SUCC', 'NOTIF_FAIL']

	return { [CALL_API]: request }
}

export const fetchTag = (id) => {
	return (dispatch, getState) => {
		if (getState().tag.getIn(['item', 'id']) === id) {
			// do not fetch if already fetched
			return Promise.resolve()
		}

		let request = get('/tags/' + id)
		request.types = ['NOOP', 'TAG_SAVE_SUCC', 'NOTIF_FAIL']

		return dispatch({
			[CALL_API]: request,
		})
	}
}

export const saveTag = (payload) => {
	let request = post('/tags', payload)

	if (payload.id) {
		// update
		request = put(`/tags/${payload.id}`, payload)
	}

	request.types = ['TAG_SAVE_REQ', 'TAG_SAVE_SUCC', 'NOTIF_FAIL']

	return { [CALL_API]: request }
}
