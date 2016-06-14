import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Field, actions } from 'react-redux-form'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Button from 'react-bootstrap/lib/Button'
import FormGroup from 'react-bootstrap/lib/FormGroup'

import PostEditor from 'components/PostEditorTinyMCE'
import TagsEditor from 'components/TagsEditor'
import PublishedAt from 'components/PublishedAt'

class FormPost extends Component {

	// populate form if edit
	componentDidMount() {
		const { dispatch, item } = this.props

		if (item) {
			// normalize values to be consumed in our form
			if (item.get('status') === 'published') {
				let model = item.set('published_at', moment(item.get('published_at').get('Time')).format('MM-DD-YYYY HH:MM'))
				dispatch(actions.load('postModel', model.toJS()))
			} else {
				let model = item.set('published_at', '')
				dispatch(actions.load('postModel', model.toJS()))
			}
		} else {
			// reset form
			dispatch(actions.reset('postModel'))
		}
	}

	_onSubmit = (action) => {
		this.props.onSubmit(action)
	}

	_onChangeBody = (body) => {
		this.props.dispatch(actions.change('postModel.body', body))
	}

	_onChangeTag = (tags) => {
		this.props.dispatch(actions.change('postModel.tags', tags))
	}

	_renderPublishedAt() {
		const { time, item } = this.props

		if (item) {
			// published_at is already dispatched on edit
			return <PublishedAt />
		} else {
			// check if /api/time is already set
			if (!time) {
				return null
			}

			return <PublishedAt time={time} />
		}
	}

	_renderTagsEditor() {
		const { postModel, item } = this.props

		if (item && !postModel.id) {
			return null
		}

		return (
			<FormGroup>
				<label htmlFor="tags">Tags</label>
				<TagsEditor
					id="tags"
					values={postModel.tags}
					onChange={this._onChangeTag} />
			</FormGroup>
		)
	}

	_renderPostEditor() {
		const { postModel, item } = this.props

		if (item && !postModel.id) {
			return null
		}

		return (
			<PostEditor value={postModel.body} onChange={this._onChangeBody} />
		)
	}

	_renderMainForm() {
		return (
			<div>
				<div className="editor-header">
					<Field model="postModel.title" className="editor-title">
						<input
							type="text"
							placeholder="Your awesome Post Title"
							className="title"
							autoFocus />
					</Field>
				</div>
				{this._renderPostEditor()}
			</div>
		)
	}

	_renderSideForm() {
		const { postModel } = this.props

		console.log('postModel', postModel.tags)
		return (
			<div>
				<div className="pull-right">
					<ButtonToolbar>
						<ButtonGroup>
							<Button onClick={this._onSubmit.bind(this, 'draft')}>Save as Draft</Button>
							<Button onClick={this._onSubmit.bind(this, 'published')} bsStyle="success">Publish</Button>
						</ButtonGroup>
					</ButtonToolbar>
				</div>
				<div className="clearfix"></div>
				<hr/>
				<Field model="postModel.featured" className="checkbox">
					<label>
						<input type="checkbox" /> Feature this post
					</label>
				</Field>
				{this._renderPublishedAt()}
				<FormGroup>
					<Field model="postModel.slug">
						<label htmlFor="slug">Post URL:</label>
						<input type="text" id="slug" className="form-control" />
					</Field>
				</FormGroup>
				<FormGroup>
					<Field model="postModel.image">
						<label htmlFor="image">Image URL:</label>
						<input type="text" id="image" className="form-control" />
					</Field>
				</FormGroup>
				{this._renderTagsEditor()}
				<hr/>
				<FormGroup>
					<Field model="postModel.meta_title">
						<label htmlFor="meta_title">Meta Title</label>
						<input type="text" id="meta_title" className="form-control" />
					</Field>
				</FormGroup>
				<FormGroup>
					<Field model="postModel.meta_description">
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

FormPost.propTypes = {
	item: PropTypes.object,
	time: PropTypes.string,
	postModel: PropTypes.object,
	onSubmit: PropTypes.func,
	dispatch: PropTypes.func,
}

export default connect()(FormPost)
