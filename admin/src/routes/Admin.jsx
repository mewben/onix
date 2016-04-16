import React, { PropTypes } from 'react';

import SideNav from '../partials/SideNav';

const Admin = ({children}) => (
	<div>
		<SideNav />
		<main>{children}</main>
	</div>
);

Admin.propTypes = {
	children: PropTypes.any
};

export default Admin;
