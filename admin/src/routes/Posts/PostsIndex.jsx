import React, { Component } from 'react';
import Link from 'react-router/lib/Link';

class PostsIndex extends Component {

	render() {
		return (
			<div>PostsIndex
				<Link to="/posts/new">Add New Post</Link>
			</div>
		);
	}
}

export default PostsIndex;
