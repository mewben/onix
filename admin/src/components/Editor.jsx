import React, { Component, PropTypes } from 'react';
import Codemirror from 'react-codemirror';

class Editor extends Component {

	static propTypes = {
		onChange: PropTypes.func,
		value: PropTypes.string
	}

	render() {
		let options = {
			lineNumbers: true,
			styleActiveLine: true,
			matchBrackets: true,
			theme: 'material'
		};
		return (
			<Codemirror
				ref="editor"
				value={this.props.value}
				options={options}
				onChange={this.props.onChange}
			/>
		);
	}
}

export default Editor;
