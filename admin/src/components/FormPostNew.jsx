import React, { Component } from 'react';
import yup from 'yup';
import Form from 'react-formal';
import { MultiSelect } from 'react-selectize';
// import RichTextEditor from 'react-rte';

import PostEditor from './PostEditor';

/*
	- Title
	- Slug
	- SubTitle
	- Body (Visual/HTML)
	- Image URL
	- Published At
	- Tags

	- Meta Title
	- Meta Description
	- SEO Preview
 */

const defaultStr = yup.string().default('');
let postSchema = yup.object({
	title: defaultStr.required('Please enter the title'),
	slug: defaultStr,
	subtitle: defaultStr,
	body: defaultStr,
	published_at: defaultStr,
	image: defaultStr
});
let defaultV = {
	title: '',
	slug: '',
	subtitle: '',
	body: '<strong>This is strong</strong>',
	published_at: '2016-04-15 8:00',
	image: ''
};
let options = ['hello', 'world', 'hi'].map((item) => {
	return {label: item, value: item};
});
let createTags = (options, values, search) => {
	let labels = values.map((value) => {
		return value.label;
	});
	let trimmed = search.trim();

	if (trimmed.length === 0 || labels.indexOf(trimmed) !== -1) {
		return null;
	}
	return {label: trimmed, value: trimmed};
};

class FormPostNew extends Component {

	constructor(props) {
		super(props);

		this.state = {
			// body: '<strong>Strong Content</strong>',
			tags: [{label: 'hello', value: 'hello'}]
		};
	}

	_onChangeTags = (tags) => {
		console.log('tags', tags);
		this.setState({
			tags: tags
		});
	};

	_handleSave = (action) => {
		// manually validate
		let post = this.refs.formpost._values.value;

		postSchema.isValid(post)
			.then((valid) => {
				if (valid) {
					// valid
					console.log('valid', action, post);
				}
			});
	};

	_onChangeEditor = (value) => {
		console.log('value', value);
	};

	_renderActionsForm() {
		return (
			<div className="card">
				<div className="card-header">Actions</div>
				<div className="card-block">
					<div className="form-group">
						<label>Publish Date:</label>
						<Form.Field
							name="published_at"
							className="form-control"
							placeholder="MM-DD-YY h:m" />
					</div>
					<div className="text-xs-right">
						<button type="button" onClick={this._handleSave.bind(this, 'draft')} className="btn btn-link">Save as Draft</button>
						<button type="button" onClick={this._handleSave.bind(this, 'publish')} className="btn btn-info">Publish</button>
					</div>
				</div>
			</div>
		);
	}

	_renderMetaForm() {
		return (
			<div className="card">
				<div className="card-header">Other Details</div>
				<div className="card-block">
					<div className="form-group">
						<label>Image URL:</label>
						<Form.Field
							name="image"
							className="form-control" />
					</div>
					<div className="form-group">
						<label>Tags:</label>
						<MultiSelect
							createFromSearch={createTags}
							options={options}
							value={this.state.tags}
							onValuesChange={this._onChangeTags}
						/>
					</div>
				</div>
			</div>
		);
	}

	_renderMainForm() {
		return (
			<div>
				<div className="form-group">
					<Form.Field
						name="title"
						className="form-control"
						placeholder="Post Title"
						autoFocus />
					<Form.Message className="text-danger" for="title" />
				</div>
				<div className="form-group">
					<Form.Field
						name="subtitle"
						className="form-control"
						placeholder="Sub Title (optional)" />
				</div>
				<div className="form-group">
					<Form.Field
						name="body"
						type={PostEditor}/*
						mapValue={{
							body: (field) => RichTextEditor.createValueFromString(field.body, 'html')
						}}*/ />
					{/* <PostEditor
							body={this.state.body}
							onChange={this._onChangeEditor} /> */}
				</div>
			</div>
		);
	}

	render() {
		return (
			<Form
				ref="formpost"
				schema={postSchema}
				defaultValue={defaultV}
				className="row"
			>
				<div className="col-sm-8">
					<div className="card">
						<div className="card-header">Write New Post</div>
						<div className="card-block">
							{this._renderMainForm()}
						</div>
					</div>
				</div>
				<div className="col-sm-4">
					<div>
						{this._renderActionsForm()}
						{this._renderMetaForm()}
					</div>
				</div>
			</Form>
		);
	}

}

export default FormPostNew;
