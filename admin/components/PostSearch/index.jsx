import React, { PropTypes, Component } from 'react'
import InputGroup, { Button as IButton } from 'react-bootstrap/lib/InputGroup'
import Button from 'react-bootstrap/lib/Button'

class PostSearch extends Component {

	_onSubmit = (e) => {
		e.preventDefault()

		this.props.onSubmit(this.refs.search.value)
	}

	render() {
		const { loading } = this.props
		let b = loading ? 'Searching...' : 'Search'

		return (
			<form onSubmit={this._onSubmit}>
				<InputGroup>
					<input
						type="text"
						ref="search"
						placeholder="Search Post..."
						className="form-control"
						autoFocus />
					<IButton>
						<Button
							type="submit"
							disabled={loading}
							bsStyle="warning">{b}</Button>
					</IButton>
				</InputGroup>
			</form>
		)
	}
}

PostSearch.propTypes = {
	loading: PropTypes.bool,
	onSubmit: PropTypes.func,
}

export default PostSearch
