import React, { Component } from 'react';
var tinymce = require('tinymce/tinymce');

require( 'tinymce/themes/modern/theme.js' );

// TinyMCE plugins
require( 'tinymce/plugins/colorpicker/plugin.js' );
require( 'tinymce/plugins/hr/plugin.js' );
require( 'tinymce/plugins/lists/plugin.js' );
require( 'tinymce/plugins/media/plugin.js' );
require( 'tinymce/plugins/paste/plugin.js' );
require( 'tinymce/plugins/tabfocus/plugin.js' );
require( 'tinymce/plugins/textcolor/plugin.js' );


let _instance = 1;
let CONTENT_CSS = [
	'/admin/build/tinymce/content.min.css',
	'/admin/build/tinymce/dashicons.css',
	'/admin/build/tinymce/editor.css',
	'//fonts.googleapis.com/css?family=Merriweather:700%2C400%2C700italic%2C400italic'
];

class TinyMCE extends Component {

	componentWillMount() {
		this._id = 'tinymce-' + _instance;
		_instance++;
	}

	componentDidMount() {
		console.log(this._id);
		console.log(tinymce);
		tinymce.init({
			selector: '#' + this._id,
			skin: 'lightgray',
			skin_url: '/admin/build/tinymce',
			content_css: CONTENT_CSS.join(','),
			resize: false,

			autoresize_min_height: document.documentElement.clientHeight,
			toolbar1: 'wpcom_add_media,formatselect,bold,italic,bullist,numlist,link,blockquote,alignleft,aligncenter,alignright,spellchecker,wp_more,wpcom_advanced',
			toolbar2: 'strikethrough,underline,hr,alignjustify,forecolor,pastetext,removeformat,wp_charmap,outdent,indent,undo,redo,wp_help',
			toolbar3: '',
			toolbar4: '',
		});
	}

	render() {
		return (
			<textarea
				ref="text"
				id={this._id}
			/>
		)
	}
}

export default TinyMCE;