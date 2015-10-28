import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { openNav } from '../actions/AppActions';
import Icon from '../components/Icon';

class Header extends Component {

	static propTypes = {
		actions: PropTypes.object,
		buttons: PropTypes.node,
		title: PropTypes.node
	}

	_renderTitle() {
		if (this.props.title) {
			return this.props.title;
		}
	}

	_renderButtons() {
		if (this.props.buttons) {
			return this.props.buttons;
		}
	}

	render() {
		let { actions } = this.props;

		return (
			<header id="header">
				<div className="row">
					<div className="col-xs-6">
						<section>
							<div onTouchTap={actions.openNav} className="logo hidden-md-up"><Icon name="logo" size="28" /></div>
							{this._renderTitle()}
						</section>
					</div>
					<div className="col-xs-6 text-right">
						{this._renderButtons()}
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
