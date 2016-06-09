import React from 'react'

import FormContainer from './FormContainer'
import { getTime } from 'containers/App/actions'
import { fetchTags } from 'containers/Tags/actions'

const PostsNew = () => (<FormContainer />)

PostsNew.onEnter = (store) => {
	return (nextState) => {
		store.dispatch(getTime())
		store.dispatch(fetchTags())
	}
}

export default PostsNew
