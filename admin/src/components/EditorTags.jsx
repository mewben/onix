import React, { Component } from 'react';

import TokenField from './token-field';

class EditorTags extends Component {

	_onTagsChange(selectedTags) {
		//let tagStat, tagEventLabel;

		console.log(selectedTags);
	}

	render() {
		const tagNames = (this.props.tags || []).map((tag) => tag.name);

		return (
			<TokenField
				value={['hello', 'there', 'is']}
				suggestions={tagNames}
				onChange={this._onTagsChange.bind(this)}
				maxSuggestions={5}
			/>
		);
	}
}

export default EditorTags;