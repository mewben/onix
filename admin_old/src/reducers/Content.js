import { Map } from 'immutable';
import * as AT from '../constants/ActionTypes';

const initialState = {
	data: new Map()
}

export default function content(state = initialState, action) {

	switch(action.type) {
		case AT.CONT_SAVE:
			return state;
	}

	return state;
}