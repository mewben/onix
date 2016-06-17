import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import PostList from 'components/PostList'
import Search from 'components/Search'
import { fetchPosts } from './actions'

class PostsList extends Component {

	_onSearch = (search) => {
		this.props.fetchPosts({title: search})
	}

	render() {
		return (
			<div>
				<div>TODO: filters</div>
				<div className="row">
					<div className="col-sm-3 col-sm-offset-9 text-right">
						<Search
							placeholder="Search Post Title..."
							onSubmit={this._onSearch} />
					</div>
				</div>
				<PostList />
				<div>TODO: Pagination</div>
			</div>
		)
	}
}

PostsList.onEnter = (store) => {
	return () => {
		store.dispatch(fetchPosts())
	}
}

PostsList.propTypes = {
	fetchPosts: PropTypes.func,
}

export default connect(
	null,
	{ fetchPosts }
)(PostsList)
