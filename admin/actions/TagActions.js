import * as AT from '../constants/ActionTypes';
import { get } from '../store/api';

export const fetchTags = () => ({
	type: AT.TAG_GET,
	payload: get('/tags')
});
