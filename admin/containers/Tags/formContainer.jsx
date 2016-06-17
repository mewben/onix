import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import FormTag from './formTag'
import { saveTag } from './actions'

class FormContainer extends Component {

	_onSubmit = (status) => {
		this.props.saveTag(this.props.selectInput, status)
			.then((res) => {
				if (!res.error) {
					this.context.router.push('/tags/' + res.payload.id + '/edit')
				}
			})
	}

	render() {
		const { selectInput, item } = this.props

		return (
			<FormTag
				item={item}
				tagModel={selectInput}
				onSubmit={this._onSubmit} />
		)
	}
}

FormContainer.contextTypes = {
	router: PropTypes.object,
}

FormContainer.propTypes = {
	item: PropTypes.object,
	selectInput: PropTypes.object,
	saveTag: PropTypes.func,
}

function mapStateToProps(state) {
	return {
		selectInput: state.tagModel,
	}
}

export default connect(
	mapStateToProps,
	{ saveTag },
)(FormContainer)
