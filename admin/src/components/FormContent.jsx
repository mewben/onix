import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import Select from 'react-select';

import * as ContentActions from '../actions/ContentActions';

import Header from '../partials/Header';
import Editor from './Editor';
import Icon from './Icon';
import ContentButtons from './ContentButtons';
import linkImmutable from '../decorators/LinkImmutable';

@linkImmutable

class FormContent extends Component {

	static propTypes = {
		history: PropTypes.object,
		isNew: PropTypes.bool,
		saveContent: PropTypes.func,
		tags: PropTypes.array,
		types: PropTypes.array
	}

	constructor(props) {
		super(props);

		this._onSubmit = this._onSubmit.bind(this);
		this._onChangeEditor = this._onChangeEditor.bind(this);

		this.state = {
			input: new Map({
				Title: '',
				Body: '',
				Type: '',
				Image: '',
				Slug: '',
				PublishedAt: '',
				MetaTitle: '',
				MetaDescription: ''
			})
		};
	}

	_onChangeEditor(value) {
		this.setState({
			input: this.state.input.set('Body', value)
		});
	}

	_onChangeSelect(attr, value) {
		this.setState({
			input: this.state.input.set(attr, value)
		});
	}

	_onChangeTags(value) {
		this.setState({
			input: this.state.input.set('Tags', value.split(','))
		});
	}

	_onSubmit(action) {
		// get input payload
		let payload = this.state.input.toJS();
		if (!payload.Slug) {
			payload.Slug = payload.Title.replace(/[^-a-zA-Z0-9\s+]+/ig, '').replace(/\s+/gi, "-").toLowerCase();
		}
		if (action === 'publish') {
			// save
			if (!payload.PublishedAt) {
				payload.PublishedAt = new Date();
			}
			this.props.saveContent(payload);
		}
	}

	_renderHeader() {
		return (
			<Header
				title="New Content"
				buttons={<ContentButtons onSubmit={this._onSubmit} />}
			/>
		);

	}

	render() {
		const {tags, types} = this.props;
		let { input } = this.state;

		return (
			<div className="col-xs-12">
				{this._renderHeader()}
				<div className="row gray edge content">
					<div className="col-lg-8">
						<div className="form-group">
							<div className="input-icon">
								<Icon name="pencil" size="24" />
								<input
									className="form-control"
									placeholder="Title"
									value={input.get('Title')}
									onChange={this.linkState.bind(this, 'input', 'Title')}
									autoFocus
								/>
							</div>
						</div>
						<div className="form-group">
							<Editor
								ref="editor"
								value={input.get('Body')}
								onChange={this._onChangeEditor}
							/>
						</div>
					</div>
					<div className="col-lg-4">
						<div className="form-group">
							<label htmlFor="type">Content Type</label>
							<div className="input-icon">
								<Select
									id="type"
									options={types}
									value={input.get('Type')}
									onChange={this._onChangeSelect.bind(this, 'Type')}
								/>
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="image">Image URL</label>
							<div className="input-icon">
								<Icon name="image" size="24" />
								<input
									id="image"
									className="form-control"
									value={input.get('Image')}
									onChange={this.linkState.bind(this, 'input', 'Image')}
								/>
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="url">Content URL</label>
							<div className="input-icon">
								<Icon name="link" size="24" />
								<input
									id="url"
									className="form-control"
									value={input.get('Slug')}
									onChange={this.linkState.bind(this, 'input', 'Slug')}
								/>
							</div>
							<small className="text-muted">localhost:1310/{input.get('Slug')}</small>
						</div>
						<div className="form-group">
							<label htmlFor="publish_date">Publish Date</label>
							<div className="input-icon">
								<Icon name="calendar" size="24" />
								<input
									id="publish_date"
									className="form-control"
									value="2015-10-20 15:34"
									//value={input.get('PublishedAt')}
									onChange={this.linkState.bind(this, 'input', 'PublishedAt')}
								/>
							</div>
							<small className="text-muted">YYYY-MM-DD hh:mm</small>
						</div>
						<div className="form-group">
							<label htmlFor="tags">Tags</label>
							<Select
								options={tags}
								value={input.get('Tags')}
								onChange={this._onChangeTags.bind(this)}
								allowCreate
								multi
							/>
						</div>
						<div className="pd-tb">
							<hr/>
						</div>
						<div className="form-group">
							<label htmlFor="meta_title">Meta Title</label>
							<input
								id="meta_title"
								className="form-control"
								value={input.get('MetaTitle')}
								onChange={this.linkState.bind(this, 'input', 'MetaTitle')}
							/>
							<small className="text-muted">Recommended: <strong>70</strong> characters: You've used <strong>0</strong></small>
						</div>
						<div className="form-group">
							<label htmlFor="meta_desc">Meta Description</label>
							<textarea
								id="meta_desc"
								className="form-control"
								rows={5}
								value={input.get('MetaDescription')}
								onChange={this.linkState.bind(this, 'input', 'MetaDescription')}
							/>
							<small className="text-muted">Recommended: <strong>70</strong> characters: You've used <strong>0</strong></small>
						</div>
						<div className="form-group">
							<label htmlFor="seo_preview">Search Engine Result Preview</label>
							<div className="seo_preview">
								<p>http://localhost:1310/</p>
								<p>TItle</p>
								<p>Description</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

}

export default connect(null, ContentActions)(FormContent);
