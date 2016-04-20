import React, { PropTypes, Component } from 'react';
import RichTextEditor from 'react-rte';

class PostEditor extends Component {

	constructor(props) {
		super(props);

		this.state = {
			value: RichTextEditor.createValueFromString(props.value, 'html'),
			format: 'string'
		};
	}

	_onChange = (value) => {
		this.setState({value});
		// Notify React-Formal
		this.props.onChange(value.toString('html'));
	};

	_onChangeSource = (e) => {
		let { format, value } = this.state;
		this.setState({
			value: value.setContentFromString(e.target.value, format)
		});
	};

	_setFormat = (format) => {
		this.setState({
			format: format
		});
	};

	_renderTabs() {
		return (
			<div className="text-right">
				<ul className="nav nav-tabs">
					<li className="nav-item">
						<button
							type="button"
							onClick={this._setFormat.bind('this', 'string')}
							className="btn nav-link active">Visual</button>
					</li>
					<li className="nav-item">
						<button
							type="button"
							onClick={this._setFormat.bind('this', 'html')}
							className="btn nav-link">HTML</button>
					</li>
				</ul>
			</div>
		);
	}

	_renderEditor() {
		let { format, value } = this.state;
		if (format === 'string') {
			return (
				<RichTextEditor
					value={value}
					onChange={this._onChange}
					onBlur={this.props.onChange} />
			);
		} else if (format === 'html') {
			return (
				<textarea
					value={value.toString('html')}
					onChange={this._onChangeSource}
					onBlur={this.props.onChange}
					rows="20"
					className="form-control code"></textarea>
			);
		}
	}

	render() {
		return (
			<div>
				{this._renderTabs()}
				{this._renderEditor()}
			</div>
		);
	}
}

PostEditor.propTypes = {
	value: PropTypes.any,
	onChange: PropTypes.func
};

export default PostEditor;
