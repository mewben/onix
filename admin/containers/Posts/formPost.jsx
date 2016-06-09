import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Form, Field, actions } from 'react-redux-form'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Button from 'react-bootstrap/lib/Button'
import FormGroup from 'react-bootstrap/lib/FormGroup'

import PostEditor from 'components/PostEditorTinyMCE'
import TagsEditor from 'components/TagsEditor'
import PublishedAt from 'components/PublishedAt'

import { slugify } from 'utils/helpers'

class FormPost extends Component {

	// populate form if edit
	componentDidMount() {
		const { dispatch, item } = this.props

		if (item) {
			// normalize values to be consumed in our form
			let model = item.set('published_at', moment(item.get('published_at').get('Time')).format('MM-DD-YYYY HH:MM'))
			dispatch(actions.load('postModel', model.toJS()))
		} else {
			// reset form
			dispatch(actions.reset('postModel'))
		}
	}

	_onSubmit = (action) => {
		// this.props.dispatch(actions.change('postModel.status', action))
		this.props.onSubmit(action)
	}

	// if new, set the slug based on title
	_onBlurTitle = () => {
		// if new
		this.props.dispatch(actions.change('postModel.slug', slugify(this.props.postModel.title)))
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

	_renderMainForm() {
		return (
			<div>
				<Field model="postModel.title">
					<input
						type="text"
						placeholder="Your awesome Post Title"
						className="form-control"
						onBlur={this._onBlurTitle}
						autoFocus />
				</Field>
				<Field model="postModel.subtitle">
					<input
						type="text"
						className="form-control"
						placeholder="A Sub Title or Tag Line" />
				</Field>
				<Field model="postModel.body">
					<PostEditor value="" onChange={this._onChangeBody} />
				</Field>
			</div>
		)
	}

	_renderSideForm() {
		return (
			<div>
				<div className="pull-right">
					<ButtonToolbar>
						<ButtonGroup>
							<Button onClick={this._onSubmit.bind(this, 'draft')}>Save as Draft</Button>
							<Button onClick={this._onSubmit.bind(this, 'published')} bsStyle="info">Publish</Button>
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
				<FormGroup>
					<Field model="postModel.tags">
						<label htmlFor="tags">Tags</label>
						<TagsEditor
							id="tags"
							value={[]}
							onChange={this._onChangeTag} />
					</Field>
				</FormGroup>
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
			<Form model="postModel" className="row">
				<div className="col-sm-9">
					{ this._renderMainForm() }
				</div>
				<div className="col-sm-3">
					{ this._renderSideForm() }
				</div>
			</Form>
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
