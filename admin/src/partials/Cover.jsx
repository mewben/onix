import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { closeNav } from '../actions/AppActions';

class Cover extends Component {

	static propTypes = {
		actions: PropTypes.object
	}

	render() {
		let { actions } = this.props;

		return (
			<div
				onTouchTap={actions.closeNav}
				className="content-cover"
			></div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators({ closeNav }, dispatch) };
}


export default connect(null, mapDispatchToProps)(Cover);
