import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Link from 'react-router/lib/Link'

const TagList = ({selectItems}) => (
	<table className="table table-hover">
		<thead>
			<tr>
				<th>Tag</th>
				<th>Description</th>
				<th># of Posts</th>
			</tr>
		</thead>
		<tbody>
			{selectItems.map((tag) => (
				<tr key={tag.get('id')}>
					<td>
						<Link to={`/tags/${tag.get('id')}/edit`}>{tag.get('name')}</Link>
					</td>
					<td>{tag.get('description')}</td>
					<td>TODO</td>
				</tr>
			))}
		</tbody>
	</table>
)

TagList.propTypes = {
	selectItems: PropTypes.object,
}

function mapStateToProps(state) {
	return {
		selectItems: state.tag.get('items'),
	}
}

export default connect(mapStateToProps)(TagList)
