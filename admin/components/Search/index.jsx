import React, { PropTypes, Component } from 'react'
import InputGroup, { Button as IButton } from 'react-bootstrap/lib/InputGroup'
import Button from 'react-bootstrap/lib/Button'

class Search extends Component {

	_onSubmit = (e) => {
		e.preventDefault()

		this.props.onSubmit(this.refs.search.value)
	}

	render() {
		const { loading, placeholder } = this.props
		let b = loading ? 'Searching...' : 'Search'

		return (
			<form onSubmit={this._onSubmit}>
				<InputGroup>
					<input
						type="text"
						ref="search"
						placeholder={placeholder}
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

Search.propTypes = {
	loading: PropTypes.bool,
	onSubmit: PropTypes.func,
	placeholder: PropTypes.string,
}

export default Search
