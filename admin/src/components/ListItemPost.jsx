import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';

const ListItemPost = ({item}) => (
	<li>
		<Link to={`/posts/${item.id}`}>
			<h4>{item.title}</h4>
		</Link>
	</li>
);

ListItemPost.propTypes = {
	item: PropTypes.object
};

export default ListItemPost;
