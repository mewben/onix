import React, { PropTypes, Component } from 'react';
import Form from 'react-formal';

import PostEditor from './PostEditor';
import TagsEditor from './TagsEditor';

class FormPost extends Component {

	_handleSave = (draft) => {
		console.log(draft);
		const {
			value,
			schema,
			handleSubmit
		} = this.props;

		schema.isValid(value)
			.then((valid) => {
				if (valid) {
					// valid
					handleSubmit(draft === 'draft');
				}
			});
	};

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
						type={PostEditor} />
				</div>
			</div>
		);
	}

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
							placeholder="MM-DD-YY hh:mm" />
					</div>
					<div className="text-xs-right">
						<button type="button" onClick={this._handleSave.bind(this, 'draft')} className="btn btn-link">Save as Draft</button>
						<button type="button" onClick={this._handleSave} className="btn btn-info">Publish</button>
					</div>
				</div>
			</div>
		);
	}

	_renderMetaForm() {
		return (
			<div className="card">
				<div className="card-header">Other details</div>
				<div className="card-block">
					<div className="form-group">
						<label>Image URL:</label>
						<Form.Field
							name="image"
							className="form-control" />
					</div>
					<div className="form-group">
						<label>Tags:</label>
						<Form.Field
							name="tags"
							type={TagsEditor} />
					</div>
				</div>
			</div>
		);
	}

	render() {
		const {
			schema,
			value,
			onChange
		} = this.props;

		return (
			<Form
				ref="formpost"
				schema={schema}
				value={value}
				className="row"
				onChange={onChange}
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
					{this._renderActionsForm()}
					{this._renderMetaForm()}
				</div>
			</Form>
		);
	}
}

FormPost.propTypes = {
	schema: PropTypes.object,
	value: PropTypes.object,
	onChange: PropTypes.func,
	handleSubmit: PropTypes.func
};

export default FormPost;
