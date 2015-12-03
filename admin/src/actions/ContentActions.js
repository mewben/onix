import ajax from '../utils/ajax';
import * as AT from '../constants/ActionTypes';

export function saveContent(content) {
	return {
		type: AT.CONT_SAVE,
		payload: {
			promise: ajax.post('/c ontent', content)
		}
	};
}
