import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Loading from 'components/Loading'
import FormContainer from './FormContainer'
import { fetchPost } from './actions'
import { fetchTags } from 'containers/Tags/actions'

const PostsEdit = ({selectItem, params}) => {
	let id = Number(params.id)

	console.log('id', id)
	console.log('item ', selectItem.toJS())

	if (id !== selectItem.get('id')) {
		return <Loading />
	}

	return <FormContainer item={selectItem} />
}

PostsEdit.propTypes = {
	selectItem: PropTypes.object,
	params: PropTypes.object,
}

PostsEdit.onEnter = (store) => {
	// load the post here
	return (nextState) => {
		store.dispatch(fetchPost(Number(nextState.params.id)))
		store.dispatch(fetchTags())
	}
}

function mapStateToProps(state) {
	return {
		selectItem: state.post.get('item'),
	}
}

export default connect(mapStateToProps)(PostsEdit)
