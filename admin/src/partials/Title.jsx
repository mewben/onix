import React, { Component, PropTypes } from 'react';

// Generic Title
class Title extends Component {

	static propTypes = {
		title: PropTypes.string.isRequired
	}

	render() {
		return (
			<div className="title">
				<small>{this.props.title}</small>
			</div>
		);
	}
}

export default Title;
