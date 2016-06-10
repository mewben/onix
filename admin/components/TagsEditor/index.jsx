import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { MultiSelect } from 'react-selectize'

import { getOptions } from 'containers/Admin/reducer'

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
		let values = props.values || []
		console.log('propsvalue', props.values)
		if (values.length > 0) {
			// transform to form { label: '', value: ''}
			values = values.map((item) => {
				return { label: item.name, value: item.id }
			})
		}

		this.state = {
			values: values,
		}
	}

	_onChange = (tags) => {
		this.setState({
			values: tags,
		})
		// this.props.onChange(tags)
	}

	_onBlur = () => {
		console.log('blur', this.state.values)
		this.props.onChange(this.state.values)
	}

	render() {
		let { values } = this.state
		const { selectTags } = this.props

		console.log('values', values)
		console.log('selectTags', selectTags)
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
		selectTags: getOptions(state.entities),
	}
}

export default connect(mapStateToProps)(TagsEditor)
