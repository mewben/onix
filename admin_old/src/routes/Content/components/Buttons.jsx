import React, { Component } from 'react';
import Link from 'react-router/lib/Link';

class Buttons extends Component {

	render() {
		return (
			<div className="right">
				<Link
					to="/content/new"
					className="btn btn-sm btn-primary"
				>
					Add New
				</Link>
			</div>
		);
	}
}

export default Buttons;
