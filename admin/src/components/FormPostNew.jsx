import React, { Component } from 'react';
import yup from 'yup';
import Form from 'react-formal';
import { MultiSelect } from 'react-selectize';

const defaultStr = yup.string().default('');
let postSchema = yup.object({
	title: defaultStr.required('Please enter the title'),
	slug: defaultStr,
	subtitle: defaultStr,
	body: defaultStr,
	published_at: defaultStr
});
let defaultV = {
	title: '',
	slug: '',
	subtitle: '',
	body: '',
	published_at: '2016-04-15 8:00'
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
			tags: [{label: 'hello', value: 'hello'}]
		};
	}

	_onChangeTags = (tags) => {
		console.log('tags', tags);
		this.setState({
			tags: tags
		});
	};

	_onClick = () => {
		// manually validate
		let post = this.refs.formpost._values.value;

		postSchema.isValid(post)
			.then((valid) => {
				if (valid) {
					// valid
					console.log('valid', post);
				}
			});
	};

	_onSubmit = (value) => {
		console.log('onSubmit', value);
	};

	_renderForm() {
		return (
			<Form
				ref="formpost"
				schema={postSchema}
				defaultValue={defaultV}
				onSubmit={this._onSubmit}
			>
				<div>
					<Form.Field name="title" placeholder="Post Title" autoFocus />
					<Form.Message for="title" />
				</div>
				<div>
					<Form.Field name="subtitle" placeholder="Sub Title" />
				</div>
				<div>
					<Form.Field name="slug" />
				</div>
				<div>
					<Form.Field type="textarea" name="body" />
				</div>
				<div>
					<Form.Field name="published_at" />
				</div>
				<div>
					<MultiSelect
						createFromSearch={createTags}
						options={options}
						value={this.state.tags}
						onValuesChange={this._onChangeTags}
					/>
				</div>
			</Form>
		);
	}

	render() {
		return (
			<div>
				Form New Post
				{this._renderForm()}
				<button type="button" onClick={this._onClick}>Manual Submit</button>
				<pre>
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
				</pre>
			</div>
		);
	}

}

export default FormPostNew;
