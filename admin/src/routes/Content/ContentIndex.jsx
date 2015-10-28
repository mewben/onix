import React, { Component } from 'react';
import Link from 'react-router/lib/Link';

class ContentIndex extends Component {

	render() {
		return (
			<div>ContentIndex
				<Link to="/content/new">Add New Content</Link>
			</div>
		);
	}
}

export default ContentIndex;
