import React, { PropTypes } from 'react';

import Navbar from '../partials/Navbar';

const Admin = ({children}) => (
	<div>
		<Navbar />
		<div className="container-fluid m-t-2">
			{children}
		</div>
	</div>
);

Admin.propTypes = {
	children: PropTypes.any
};

export default Admin;
