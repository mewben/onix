import React, { Component } from 'react'
import { Editor, convertFromHTML } from 'draft-js'

class PostEditorDraft extends Component {

	constructor(props) {
		super(props)

		this.state = {
			editorState: convertFromHTML('<h1>Hello</h1>'),
			// editorState: EditorState.createEmpty(),
		}
	}

	_onChange = (editorState) => {
		this.setState({
			editorState: editorState,
		})
	}

	render() {
		let { editorState } = this.state

		return (
			<div>
				<span>Editor by Draft.js</span>
				<Editor
					editorState={editorState}
					onChange={this._onChange} />
			</div>
		)
	}
}

export default PostEditorDraft
