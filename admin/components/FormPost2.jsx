import React, { PropTypes, Component } from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';

import bindInput from '../hoc/bindInput';
import PostEditor from './PostEditor';
import TagsEditor from './TagsEditor';

class FormPost extends Component {

	constructor(props) {
		super(props);

		this.state = {
			input: props.value
		};
	}

	_onSubmit = (action) => {
		console.log('action', action);
	};

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

	_onChangeEditor = (body) => {
		this.setState({
			body: body
		});
	};

	_renderMainForm() {
		let { input } = this.state;
		const { __bindInput } = this.props;

		return (
			<div>
				<FormControl
					type="text"
					value={input.get('title')}
					placeholder="Your Awesome Post Title"
					onChange={__bindInput.bind(this, 'input', 'title')}
					autoFocus />
				<FormControl
					type="text"
					value={input.get('subtitle')}
					placeholder="A Sub Title or Tag Line"
					onChange={__bindInput.bind(this, 'input', 'subtitle')} />
				<PostEditor
					value={input.get('body')}
					onChange={this._onChangeEditor} />
			</div>
		);
	}

	_renderSideForm() {
		return (
			<div>
				<div className="pull-right">
					<ButtonToolbar>
						<ButtonGroup>
							<Button onClick={this._onSubmit.bind(this, 'draft')}>Save as Draft</Button>
							<Button onClick={this._onSubmit.bind(this, 'publish')} bsStyle="info">Publish</Button>
						</ButtonGroup>
					</ButtonToolbar>
				</div>
				<div className="clearfix"></div>
				<hr/>
				<FormGroup>
					<label htmlFor="published_at">Publish Date:</label>
					<FormControl
						type="text"
						id="published_at"
						placeholder="MM-DD-YYYY hh:mm" />
				</FormGroup>
				<FormGroup>
					<label htmlFor="image">Image URL:</label>
					<FormControl
						type="text"
						id="image" />
				</FormGroup>
				<FormGroup>
					<label htmlFor="tags">Tags</label>
					<TagsEditor
						id="tags"
						value={[]} />
				</FormGroup>
				<hr/>
				<FormGroup>
					<label htmlFor="meta_title">Meta Title</label>
					<FormControl
						type="text"
						id="meta_title" />
				</FormGroup>
				<FormGroup>
					<label htmlFor="meta_description">Meta Description</label>
					<textarea
						text="textarea"
						className="form-control"
						rows="4"
						id="meta_description" />
				</FormGroup>
			</div>
		);
	}
/*

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
*/
	render() {
		return (
			<Row>
				<Col sm={9}>
					{this._renderMainForm()}
				</Col>
				<Col sm={3}>
					{this._renderSideForm()}
					{/* this._renderMetaForm() */}
				</Col>
			</Row>
		);
	}
}

FormPost.propTypes = {
	__bindInput: PropTypes.func,
	schema: PropTypes.object,
	value: PropTypes.object,
	onChange: PropTypes.func,
	handleSubmit: PropTypes.func
};

export default bindInput(FormPost);
