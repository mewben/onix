import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Loading from 'components/Loading'
import FormContainer from './FormContainer'
import { fetchTag } from './actions'

// import { getTagByID } from 'containers/Admin/reducer'

const TagsEdit = ({selectItem, params}) => {
	if (!selectItem || selectItem.get('id') !== Number(params.id)) {
		return <Loading />
	}

	return <FormContainer item={selectItem} />
}

TagsEdit.propTypes = {
	params: PropTypes.object,
	selectItem: PropTypes.object,
}

TagsEdit.onEnter = (store) => {
	// load the tag here
	return (nextState) => {
		store.dispatch(fetchTag(Number(nextState.params.id)))
	}
}

function mapStateToProps(state, ownProps) {
	return {
		selectItem: state.tag.get('item'),
	}
}

export default connect(mapStateToProps)(TagsEdit)
