import { fromJS } from 'immutable'
import { modelReducer, formReducer } from 'react-redux-form'

const formTagState = {
	id: 0,
	name: '',
	slug: '',
	description: '',
	image: '',
	is_visible: true,
	parent_id: 0,
	meta_title: '',
	meta_description: '',
}

const initialState = fromJS({
	items: [],
	fetched: false,
	loading: false,
})

const tagModel = modelReducer('tagModel', formTagState)
const tagForm = formReducer('tagModel', formTagState)

export default function tag(state = initialState, action) {
	switch (action.type) {
		case 'TAG_GET_SUCC':
			return state
				.set('fetched', true)
				.set('items', fromJS(action.payload || []))

		case 'TAG_SAVE_SUCC':
			return state
				.set('loading', false)
				.set('item', fromJS(action.payload))

		default:
			return state
	}
}

const tagOptions = (items) => {
	let tags = []

	items.map((tag) => {
		tags.push({
			label: tag.get('name'),
			value: tag.get('id') + '', // string
		})
	})

	return tags
}

export {
	tagOptions,
	tagModel,
	tagForm,
}
