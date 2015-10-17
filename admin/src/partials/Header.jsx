import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { openNav } from '../actions/AppActions';
import Icon from '../components/Icon';

class Header extends Component {

	static propTypes = {
		actions: PropTypes.object
	}

	render() {
		let { actions } = this.props;

		return (
			<header id="header">
				<div className="row">
					<div className="col-xs-6">
						<section>
							<div onTouchTap={actions.openNav} className="logo hidden-md-up"><Icon name="logo" size="28" /></div>
							<div className="title">Dashboard</div>
						</section>
					</div>
					<div className="col-xs-6 text-right">
						<button className="btn btn-sm btn-primary">New</button>
					</div>
				</div>
			</header>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators({ openNav }, dispatch) };
}


export default connect(null, mapDispatchToProps)(Header);
