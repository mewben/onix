import { fromJS, List } from 'immutable';
import * as AT from '../constants/ActionTypes';

const initialState = {
	items: new List(),
	isFetched: false
};

export default function tag(state = initialState, action) {
	switch (action.type) {
		case `${AT.TAG_GET}_S`:
			return {
				...state,
				isFetched: true,
				items: fromJS(action.payload || [])
			};

		default:
			return state;
	}
};
