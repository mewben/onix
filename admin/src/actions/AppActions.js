import * as AT from '../constants/ActionTypes';
import { get } from '../store/api';

export const getUTCTime = () => ({
	type: AT.UTC_TIME,
	payload: get('/utctime')
});
