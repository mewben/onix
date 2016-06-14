import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Loading from 'components/Loading'
import FormContainer from './FormContainer'
import { fetchPost } from './actions'
import { fetchTags } from 'containers/Tags/actions'

// import { getPostByID } from 'containers/Admin/reducer'

const PostsEdit = ({selectItem, params}) => {
	if (!selectItem || selectItem.get('id') !== Number(params.id)) {
		return <Loading />
	}

	return <FormContainer item={selectItem} />
}

PostsEdit.propTypes = {
	params: PropTypes.object,
	selectItem: PropTypes.object,
}

PostsEdit.onEnter = (store) => {
	// load the post here
	return (nextState) => {
		store.dispatch(fetchPost(Number(nextState.params.id)))
		store.dispatch(fetchTags())
	}
}

function mapStateToProps(state, ownProps) {
	return {
		selectItem: state.post.get('item'), // getPostByID(state, ownProps.params.id),
	}
}

export default connect(mapStateToProps)(PostsEdit)
