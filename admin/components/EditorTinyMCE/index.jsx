import React, { PropTypes, Component } from 'react'
// import { findDOMNode } from 'react-dom'
import TinyMCE from 'react-tinymce'
import Tabs from 'react-bootstrap/lib/Tabs'
import Tab from 'react-bootstrap/lib/Tab'

class EditorTinyMCE extends Component {

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

	_handleTab = (key) => {
		this.setState({
			format: key,
		})
	}

	_renderTabs() {
		return (
			<Tabs activeKey={this.state.format} onSelect={this._handleTab} id="controlled-tab-example" animation={false}>
        <Tab eventKey={'html'} title="HTML">
					{this._renderEditor()}
				</Tab>
				<Tab eventKey={'visual'} title="Visual">
				{this._renderEditor()}
				</Tab>
      </Tabs>
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
					ref="code"
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
			</div>
		)
	}
}

EditorTinyMCE.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func,
}

export default EditorTinyMCE
