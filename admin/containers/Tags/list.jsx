import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Link from 'react-router/lib/Link'

import TagList from 'components/TagList'
import Search from 'components/Search'
import { fetchTags } from './actions'

class TagsList extends Component {

	_onSearch = (search) => {
		this.props.fetchTags({name: search})
	}

	render() {
		return (
			<div>
				<div className="header">
					<h3>Tags <Link to="/tags/new" className="btn btn-danger">+ Add New</Link></h3>
				</div>
				<div>TODO: filters</div>
				<div className="row">
					<div className="col-sm-3 col-sm-offset-9 text-right">
						<Search
							placeholder="Search Tag"
							onSubmit={this._onSearch} />
					</div>
				</div>
				<TagList />
				<div>TODO: Pagination</div>
			</div>
		)
	}
}

// TODO: cache tags
TagsList.onEnter = (store) => {
	return () => {
		store.dispatch(fetchTags())
	}
}

TagsList.propTypes = {
	fetchTags: PropTypes.func,
}

export default connect(
	null,
	{ fetchTags }
)(TagsList)
