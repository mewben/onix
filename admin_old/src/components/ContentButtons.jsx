import React, { Component, PropTypes } from 'react';
import SplitButton from 'react-bootstrap/lib/SplitButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

class ContentButtons extends Component {

	static propTypes = {
		onSubmit: PropTypes.func
	}

	render() {
		const { onSubmit } = this.props;

		return (
			<div className="right">
				<SplitButton
					id="contentbutton"
					title="Publish"
					bsStyle="primary"
					bsSize="sm"
					onClick={onSubmit.bind(this, 'publish')}
				>
					<MenuItem
						onClick={onSubmit.bind(this, 'publish')}
					>Publish</MenuItem>
					<MenuItem
						onClick={onSubmit.bind(this, 'draft')}
					>Save As Draft</MenuItem>
					<MenuItem divider />
					<MenuItem
						onClick={onSubmit.bind(this, 'delete')}
					>Delete Post</MenuItem>
				</SplitButton>
			</div>
		);
	}
}

export default ContentButtons;
