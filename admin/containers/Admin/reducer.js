/* import { fromJS } from 'immutable'
import { normalize, Schema, arrayOf } from 'normalizr'

const initialState = fromJS({
	posts: {},
	tags: {},
})

const postSchema = new Schema('posts')
const tagSchema = new Schema('tags')

postSchema.define({
	tags: arrayOf(tagSchema),
})

export default function entities(state = initialState, action) {
	switch (action.type) {
		case 'TAGS_GET_SUCC':
			let tags = normalize(
				{tags: action.payload || []},
				{tags: arrayOf(tagSchema)},
			)
			return state.set('tags', fromJS(tags.entities.tags || {}))

		case 'POST_SAVE_SUCC':
			let post = normalize(action.payload, postSchema)
			return state
				.set('posts', state.get('posts').merge(fromJS(post.entities.posts || {})))
				.set('tags', state.get('tags').merge(fromJS(post.entities.tags || {})))

		default:
			return state
	}
}

// convert tags object to array of options
const getOptions = (state) => {
	let options = []
	state.get('tags').map((tag) => {
		options.push({
			label: tag.get('name'),
			value: tag.get('id') + '', // convert to string
		})
	})
	return options
}

const getTagByID = (state, tag_id) => {
	return state.getIn(['tags', tag_id])
}

const getPostByID = (state, post_id) => {
	let post = state.entities.getIn(['posts', post_id])

	// loop through tags to get the tag object
	if (post && post.get('tags')) {
		let post_tags = post.get('tags').map((tag_id) => {
			return getTagByID(state.entities, tag_id + '')
		})
		post = post.set('tags', post_tags)
	}

	return post
}

export {
	getOptions,
	getPostByID,
	getTagByID,
}
*/
