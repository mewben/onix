import { CALL_API } from 'redux-api-middleware'
import { get } from 'utils/network'

export const getTime = () => {
	let request = get('/time')

	request.types = ['NOOP', 'TIME', 'NOOP']

	return { [CALL_API]: request }
}
