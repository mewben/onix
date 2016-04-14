import React, { Component } from 'react';
import SplitButton from 'react-bootstrap/lib/SplitButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

class Buttons extends Component {

	render() {
		return (
			<div className="right">
				<SplitButton
					title="Publish"
					bsStyle="primary"
					bsSize="sm"
				>
					<MenuItem>Publish</MenuItem>
					<MenuItem>Save As Draft</MenuItem>
					<MenuItem divider />
					<MenuItem>Delete Post</MenuItem>
				</SplitButton>
			</div>
		);
	}
}

export default Buttons;
