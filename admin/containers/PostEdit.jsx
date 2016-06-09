import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import FormPost from 'components/FormPost'

class PostEdit extends Component {

	_onSubmit = (action) => {
		console.log('action', this.props.input)
	}

	render() {
		const { time, input } = this.props

		console.log('model', this.props.input)
		return (
			<FormPost
				time={time}
				postModel={input}
				onSubmit={this._onSubmit} />
		)
	}
}

PostEdit.propTypes = {
	time: PropTypes.string,
	input: PropTypes.object
}

function mapStateToProps(state) {
	return {
		time: state.app.time,
		input: state.postModel
	}
}

export default connect(mapStateToProps)(PostEdit)
