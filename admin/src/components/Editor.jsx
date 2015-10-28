import React, { Component } from 'react';
import Codemirror from 'react-codemirror';

class Editor extends Component {

	render() {
		let options = {
			lineNumbers: true,
			styleActiveLine: true,
			matchBrackets: true,
			theme: 'material'
		};
		return (
			<Codemirror
				value="<h1>Hello</h1>"
				options={options}
			/>
		);
	}
}

export default Editor;
