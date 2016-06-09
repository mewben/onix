import { CALL_API } from 'redux-api-middleware'
import { get } from 'utils/network'

export const fetchTags = () => {
	let request = get('/tags')

	request.types = ['NOOP', 'TAGS_GET_SUCC', 'NOTIF_FAIL']

	return { [CALL_API]: request }
}
