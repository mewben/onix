import React, { PropTypes, Component } from 'react';

import ListPosts from '../components/ListPosts';

let posts = [{
	id: 1,
	title: 'Post 1',
	subtitle: 'A subtitle 1',
	body: 'Content 1'
}, {
	id: 2,
	title: 'Post 2',
	subtitle: 'A subtitle 2',
	body: 'Content 2'
}, {
	id: 3,
	title: 'Post 3',
	subtitle: 'A subtitle 3',
	body: 'Content 3'
}];

class Posts extends Component {

	componentDidMount() {
		if (posts.length > 0) {
			this.context.router.replace(`/posts/${posts[0].id}`);
		}
	}

	render() {
		const { children } = this.props;
		return (
			<div>
				<h1>Posts</h1>
				<ListPosts items={posts} />
				{children}
			</div>
		);
	}
}

Posts.contextTypes = {
	router: PropTypes.object.isRequired
};

Posts.propTypes = {
	children: PropTypes.any
};

export default Posts;
