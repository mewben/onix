import { fromJS } from 'immutable'
import { modelReducer, formReducer } from 'react-redux-form'

const formPostState = {
	id: 0,
	uuid: '',
	title: '',
	subtitle: '',
	slug: '',
	body: '',
	excerpt: '',
	featured: false,
	published_at: '',
	status: 'draft',
	image: '',
	tags: [],
	meta_title: '',
	meta_description: '',
}

const initialState = fromJS({
	loading: false,
	items: [],
	item: {},
})

const postModel = modelReducer('postModel', formPostState)
const postForm = formReducer('postModel', formPostState)

export default function post(state = initialState, action) {
	switch (action.type) {
		case 'POST_SAVE_REQ':
			return state.set('loading', true)

		case 'POST_GET_SUCC':
			return state.set('items', fromJS(action.payload || []))

		case 'POST_SAVE_SUCC':
			return state
				.set('loading', false)
				.set('item', fromJS(action.payload))

		case 'NOTIF_FAIL':
			return state.set('loading', false)

		default:
			return state
	}
}

export {
	postModel,
	postForm,
}
