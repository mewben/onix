import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { MultiSelect } from 'react-selectize'

let createTags = (options, values, search) => {
	let labels = values.map((value) => {
		return value.label
	})
	let trimmed = search.trim()

	if (trimmed.length === 0 || labels.indexOf(trimmed) !== -1) {
		return null
	}
	return {label: trimmed, value: trimmed}
}

class TagsEditor extends Component {

	constructor(props) {
		super(props)

		this.state = {
			values: props.values || [],
		}
	}

	_onChange = (tags) => {
		this.setState({
			values: tags,
		})
	}

	_onBlur = () => {
		this.props.onChange(this.state.values)
	}

	render() {
		let { values } = this.state
		const { selectTags } = this.props

		return (
			<MultiSelect
				theme="bootstrap3"
				createFromSearch={createTags}
				values={values}
				options={selectTags}
				onValuesChange={this._onChange}
				onBlur={this._onBlur}
			/>
		)
	}
}

TagsEditor.propTypes = {
	values: PropTypes.any,
	onChange: PropTypes.func,
	selectFetched: PropTypes.bool,
	selectTags: PropTypes.array,
}

function mapStateToProps(state) {
	return {
		selectFetched: state.tag.get('fetched'),
		selectTags: state.tag.get('options').toJS(),
	}
}

export default connect(mapStateToProps)(TagsEditor)
