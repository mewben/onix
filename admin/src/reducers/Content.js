import { Map } from 'immutable';

const initialState = {
	data: new Map()
};

export default function content(state = initialState, action) {

	switch(action.type) {

		default:
			return state;
	}

}