import React, { Component, PropTypes } from 'react';
import Link from 'react-router/lib/Link';

import Icon from '../../../components/Icon';

class Title extends Component {

	static propTypes = {
		title: PropTypes.string.isRequired
	}

	render() {
		return (
			<div className="title">
				<Link to="/content"><Icon name="left" /></Link>
				<small>{this.props.title}</small>
			</div>
		);
	}
}

export default Title;
