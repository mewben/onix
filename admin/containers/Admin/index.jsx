import React, { PropTypes } from 'react'

import TopNav from 'partials/TopNav'
import Footer from 'partials/Footer'

const Admin = ({children}) => (
	<div>
		<TopNav />
		<div className="container m-t-2">
			{children}
			<Footer />
		</div>
	</div>
)

Admin.propTypes = {
	children: PropTypes.node,
}

export default Admin
