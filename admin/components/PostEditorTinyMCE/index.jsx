import React, { Component } from 'react'
import TinyMCE from 'react-tinymce'

class PostEditorTinyMCE extends Component {

	render() {
		return (
			<TinyMCE
				content="<h1>This is the content</h1>"
				config={{
					theme: 'modern',
					skin: 'light',
					skin_url: '/tinymce',
					menubar: false,
				}} />
		)
	}
}

export default PostEditorTinyMCE
