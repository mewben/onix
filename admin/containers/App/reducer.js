import { fromJS } from 'immutable'

const initialState = fromJS({
	time: '',
})

export default function app(state = initialState, action) {
	switch (action.type) {

		case 'TIME':
			return state.set('time', action.payload)

		default:
			return state
	}
}
