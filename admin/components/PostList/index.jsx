import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Link from 'react-router/lib/Link'
import moment from 'moment'

const PostList = ({selectItems}) => (
	<table className="table table-hover">
		<thead>
			<tr>
				<th>Title</th>
				<th>Status</th>
				<th>Published At</th>
			</tr>
		</thead>
		<tbody>
			{selectItems.map((post) => (
				<tr key={post.get('id')}>
					<td>
						<Link to={`/posts/${post.get('id')}/edit`}>{post.get('title')}</Link>
					</td>
					<td>{post.get('status')}</td>
					<td>{post.get('published_at').get('Valid') && moment(post.get('published_at').get('Time')).fromNow()}</td>
				</tr>
			))}
		</tbody>
	</table>
)

PostList.propTypes = {
	selectItems: PropTypes.object,
}

function mapStateToProps(state) {
	return {
		selectItems: state.post.get('items'),
	}
}

export default connect(mapStateToProps)(PostList)
