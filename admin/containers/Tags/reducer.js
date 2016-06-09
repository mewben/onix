import { fromJS } from 'immutable'

const initialState = fromJS({
	items: [],
	options: [],
	fetched: false
})

export default function tag(state = initialState, action) {
	switch (action.type) {
		case 'TAGS_GET_SUCC':
			let tags = action.payload || []

			// loop through results to prepare them as options
			let options = tags.map((tag) => {
				return {
					label: tag.name,
					value: tag.id + '', // string
				}
			})
			return state
				.set('fetched', true)
				.set('items', fromJS(tags))
				.set('options', fromJS(options))

		default:
			return state
	}
}
