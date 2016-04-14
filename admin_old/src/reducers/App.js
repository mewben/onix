import { Map } from 'immutable';
import * as AT from '../constants/ActionTypes';

const initialState = {
	flags: new Map({
		navOpen: false
	})
};

export default function app(state = initialState, action) {

	switch(action.type) {
		case AT.NAV_OPEN:
			return {
				...state,
				flags: state.flags.set('navOpen', true)
			};

		case AT.NAV_CLOSE:
			return {
				...state,
				flags: state.flags.set('navOpen', false)
			};
	}

	return state;
}
