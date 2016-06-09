import React, { PropTypes } from 'react';

import ListItemPost from './ListItemPost';

const ListPosts = ({items}) => (
	<ul className="nav nav-stacked">
		{items.map((item) => <ListItemPost key={item.id} item={item} />)}
	</ul>
);

ListPosts.propTypes = {
	items: PropTypes.array
};

export default ListPosts;
