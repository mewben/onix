import React, { Component, PropTypes } from 'react';

class Content extends Component {

	static propTypes = {
		children: PropTypes.node
	}

	render() {
		return (
			<div className="row">
				{this.props.children}
			</div>
		);
	}
}

export default Content;
