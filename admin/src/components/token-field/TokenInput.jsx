import React, { Component } from 'react';

class TokenInput extends Component {

	componentWillReceiveProps(nextProps) {
		if (nextProps.isActive && !this.props.isActive) {
			setTimeout(() => {
				this.refs.text.focus();
			}, 100);
		}
	}

	_onClick() {
		this.refs.text.focus();
	}

	render() {
		const { value, onChange } = this.props;

		return (
			<input
				type="text"
				ref="text"
				size={ value.length + 1}
				className="token-field__input"
				onChange={onChange.bind(this)}
			/>
		);
	}
}

export default TokenInput;