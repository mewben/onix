import React, { PropTypes, Component } from 'react';
import { Map } from 'immutable';

class PostsShow extends Component {

	constructor(props) {
		super(props);

		this.state = {
			item: new Map()
		};
	}

	render() {
		const { params } = this.props;

		return (
			<h1>Show Post {params.id}</h1>
		);
	}

}

PostsShow.propTypes = {
	params: PropTypes.object.isRequired
};

export default PostsShow;
