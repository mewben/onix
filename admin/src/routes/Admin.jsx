import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import SideNav from '../partials/SideNav';

const Admin = ({app, children}) => {
	const cl = cn(app.flags.toJS());

	return (
		<div className={cl}>
			<SideNav />
			<main>{children}</main>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		app: state.app
	};
}

export default connect(mapStateToProps)(Admin);