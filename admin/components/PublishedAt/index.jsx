import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import { Field, actions } from 'react-redux-form'

class PublishedAt extends Component {

	componentDidMount() {
		this.props.dispatch(actions.change('postModel.published_at', this.props.time))
	}

	render() {
		return (
			<FormGroup>
				<Field model="postModel.published_at">
					<label htmlFor="published_at">Publish Date: <small className="text-muted">MM-DD-YYYY hh:mm</small></label>
					<input
						type="text"
						id="published_at"
						className="form-control"
						placeholder="MM-DD-YYYY hh:mm" />
				</Field>
			</FormGroup>
		)
	}
}

PublishedAt.propTypes = {
	time: PropTypes.string,
	dispatch: PropTypes.func,
}

export default connect()(PublishedAt)
