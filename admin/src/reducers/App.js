import { Map } from 'immutable';

const initialState = {
	flags: new Map({
		navOpen: false
	})
};

export default function app(state = initialState, action) {

	switch(action.type) {
		default:
			return state;
	}

}