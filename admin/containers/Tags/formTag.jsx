import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Field, actions } from 'react-redux-form'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Button from 'react-bootstrap/lib/Button'
import FormGroup from 'react-bootstrap/lib/FormGroup'

import Editor from 'components/EditorTinyMCE'

class FormTag extends Component {

	// populate form if edit
	componentDidMount() {
		const { dispatch, item } = this.props

		if (item) {
			dispatch(actions.load('tagModel', item.toJS()))
		} else {
			// reset form
			dispatch(actions.reset('tagModel'))
		}
	}

	_onSubmit = () => {
		this.props.onSubmit()
	}

	_onChangeBody = (body) => {
		this.props.dispatch(actions.change('tagModel.description', body))
	}

	_renderEditor() {
		const { tagModel, item } = this.props

		if (item && !tagModel.id) {
			return null
		}

		return (
			<Editor value={tagModel.description} onChange={this._onChangeBody} />
		)
	}

	_renderMainForm() {
		return (
			<div>
				<div className="editor-header">
					<Field model="tagModel.name" className="editor-title">
						<input
							type="text"
							placeholder="Your awesome Tag Title"
							className="title"
							autoFocus />
					</Field>
				</div>
				{this._renderEditor()}
			</div>
		)
	}

	_renderSideForm() {
		return (
			<div>
				<div className="pull-right">
					<ButtonToolbar>
						<ButtonGroup>
							<Button onClick={this._onSubmit} bsStyle="success">Save Tag</Button>
						</ButtonGroup>
					</ButtonToolbar>
				</div>
				<div className="clearfix"></div>
				<hr/>
				<FormGroup>
					<Field model="tagModel.slug">
						<label htmlFor="slug">Tag URL:</label>
						<input type="text" id="slug" className="form-control" />
					</Field>
				</FormGroup>
				<FormGroup>
					<Field model="tagModel.image">
						<label htmlFor="image">Image URL:</label>
						<input type="text" id="image" className="form-control" />
					</Field>
				</FormGroup>
				<hr/>
				<FormGroup>
					<Field model="tagModel.meta_title">
						<label htmlFor="meta_title">Meta Title</label>
						<input type="text" id="meta_title" className="form-control" />
					</Field>
				</FormGroup>
				<FormGroup>
					<Field model="tagModel.meta_description">
						<label htmlFor="meta_description">Meta Description</label>
						<textarea
							className="form-control"
							rows="4"
							id="meta_description" />
					</Field>
				</FormGroup>
			</div>
		)
	}

	render() {
		return (
			<div className="row editor">
				<div className="col-sm-9">
					<div className="wrapper">
						{ this._renderMainForm() }
					</div>
				</div>
				<div className="col-sm-3">
					{ this._renderSideForm() }
				</div>
			</div>
		)
	}
}

FormTag.propTypes = {
	item: PropTypes.object,
	tagModel: PropTypes.object,
	onSubmit: PropTypes.func,
	dispatch: PropTypes.func,
}

export default connect()(FormTag)
