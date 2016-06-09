import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import FormPost from './formPost'
import { savePost } from './actions'

class FormContainer extends Component {

	_onSubmit = (status) => {
		this.props.savePost(this.props.selectInput, status)
			.then((res) => {
				this.context.router.push('/posts/' + res.payload.id + '/edit')
			})
	}

	render() {
		const { selectTime, selectInput, item } = this.props

		return (
			<FormPost
				item={item}
				time={selectTime}
				postModel={selectInput}
				onSubmit={this._onSubmit} />
		)
	}
}

FormContainer.contextTypes = {
	router: PropTypes.object,
}

FormContainer.propTypes = {
	item: PropTypes.object,
	selectTime: PropTypes.string,
	selectInput: PropTypes.object,
	savePost: PropTypes.func,
}

function mapStateToProps(state) {
	return {
		selectTime: state.app.get('time'),
		selectInput: state.postModel,
	}
}

export default connect(
	mapStateToProps,
	{ savePost },
)(FormContainer)
