import React, { Component, PropTypes } from 'react';

class Posts extends Component {

	static propTypes = {
		children: PropTypes.node
	}

	render() {
		return (
			<div>
				<h1>Posts</h1>
				{this.props.children}
			</div>
		);
	}
}

export default Posts;
