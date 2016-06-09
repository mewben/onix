import React, { PropTypes, Component } from 'react'
import RichTextEditor from 'react-rte'

class PostEditor extends Component {

	constructor(props) {
		super(props)

		this.state = {
			input: RichTextEditor.createValueFromString(props.value, 'html'),
			format: 'visual',
		}
	}

	_onBlur = () => {
		this.props.onChange(this.state.input.toString('html'))
	}

	_onChange = (input) => {
		this.setState({input})
	}

	_onChangeSource = (e) => {
		let { format, input } = this.state
		this.setState({
			input: input.setContentFromString(e.target.value, format),
		})
	}

	_setFormat = (format) => {
		this.setState({
			format: format,
		})
	}

	_renderTabs() {
		return (
			<div className="text-right">
				<ul className="nav nav-tabs">
					<li className="nav-item">
						<button
							type="button"
							onClick={this._setFormat.bind('this', 'visual')}
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
		)
	}

	_renderEditor() {
		let { format, input } = this.state
		if (format === 'visual') {
			return (
				<RichTextEditor
					value={input}
					onChange={this._onChange}
					onBlur={this._onBlur} />
			)
		} else if (format === 'html') {
			return (
				<textarea
					value={input.toString('html')}
					onChange={this._onChangeSource}
					onBlur={this._onBlur}
					rows="20"
					className="form-control code"></textarea>
			)
		}
	}

	render() {
		return (
			<div>
				{this._renderTabs()}
				{this._renderEditor()}
			</div>
		)
	}
}

PostEditor.propTypes = {
	value: PropTypes.any,
	onChange: PropTypes.func,
}

export default PostEditor
