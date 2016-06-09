import { modelReducer, formReducer } from 'react-redux-form'

const formPostState = {
	id: 0,
	uuid: '',
	title: '',
	subtitle: '',
	slug: '',
	body: '',
	featured: false,
	published_at: '',
	image: '',
	tags: [],
	meta_title: '',
	meta_description: ''
}

const initialState = {}

export const postModel = modelReducer('postModel', formPostState)
export const postForm = formReducer('postModel', formPostState)

export default function post(state = initialState, action) {
	switch (action.type) {
		default:
			return state
	}
}
