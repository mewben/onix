const initialState = {
	time: ''
}

export default function app(state = initialState, action) {
	switch (action.type) {

		case 'TIME':
			return {
				...state,
				time: action.payload
			}

		default:
			return state
	}
}
