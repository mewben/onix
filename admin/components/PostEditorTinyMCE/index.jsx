import React, { PropTypes, Component } from 'react'
import TinyMCE from 'react-tinymce'

class PostEditorTinyMCE extends Component {

	constructor(props) {
		super(props)

		this.state = {
			input: props.value,
			format: 'visual', // TODO persist this in localStorage
		}
	}

	_setFormat = (format) => {
		this.setState({
			format: format,
		})
	}

	_onBlur = (editor, e) => {
		let body = editor === 'mce' ? e.target.getContent() : e.target.value

		this.setState({
			input: body,
		})
		this.props.onChange(body)
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
				<TinyMCE
					ref="visual"
					onBlur={this._onBlur.bind(this, 'mce')}
					content={input}
					config={{
						theme: 'modern',
						skin: 'light',
						skin_url: '/tinymce',
						menubar: false,
						statusbar: false,
						plugins: 'link anchor hr image fullscreen',
						toolbar: 'bold italic underline | bullist numlist blockquote hr | link unlink anchor | image styleselect fullscreen',
						min_height: 300,
					}} />
			)
		} else {
			return (
				<textarea
					defaultValue={input}
					onBlur={this._onBlur.bind(this, '')}
					className="code" />
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

PostEditorTinyMCE.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func,
}

export default PostEditorTinyMCE
