import React, { PropTypes, Component } from 'react'
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
		let values = props.value
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
	value: PropTypes.any,
	onChange: PropTypes.func,
	selectFetched: PropTypes.bool,
	selectTags: PropTypes.array,
}

function mapStateToProps(state) {
	selectFetched: state.tag.get('fetched'),
	selectTags: state.tag.get('options').toJS(),
}

export default connect(mapStateToProps)(TagsEditor)
