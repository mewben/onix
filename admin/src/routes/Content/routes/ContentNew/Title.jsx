import React, { Component } from 'react';
import Link from 'react-router/lib/Link';

import Icon from '../../../../components/Icon';

class Title extends Component {

	render() {
		return (
			<div className="title">
				<Link to="/content"><Icon name="left" /></Link>
				<small>New Content</small>
			</div>
		);
	}
}

export default Title;
