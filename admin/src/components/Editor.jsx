import React, { Component } from 'react';
import ReactQuill from 'react-quill';

class Editor extends Component {

	render() {
		return (
			<ReactQuill
				theme="snow"
				value="Hello"
			/>
		);
	}
}

export default Editor;
