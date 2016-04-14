import React, { Component } from 'react';

class Token extends Component {

	render() {
		const { value } = this.props;

		return (
			<span className="token-field__token">
				<span className="token-field__token-text">{value}</span>
				<span className="token-field__remove-token">&times;
				</span>
			</span>
		);
	}
}

export default Token;