import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import SideNav from '../partials/SideNav';
import Cover from '../partials/Cover';

class App extends Component {

	static propTypes = {
		children: PropTypes.node,
		store: PropTypes.object
	}

	render() {
		let { store } = this.props,
			cl = cn(store.flags.toJS());

		return (
			<div id="viewport" className={cl}>
				<SideNav />
				<div id="main">
					{this.props.children}
				</div>
				<Cover />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { store: state.app };
}

export default connect(mapStateToProps)(App);
