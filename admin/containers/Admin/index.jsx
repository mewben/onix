import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import DialogLoggedOutSession from 'components/DialogLoggedOutSession'
import Notification from 'components/Notification'
import TopNav from 'partials/TopNav'
import Footer from 'partials/Footer'

const Admin = ({children, selectIsLoggedIn}) => (
	<div>
		<TopNav />
		<div className="container m-t-2">
			{children}
			<DialogLoggedOutSession isLoggedOut={!selectIsLoggedIn} />
			<Footer />
			<Notification />
		</div>
	</div>
)

Admin.propTypes = {
	children: PropTypes.node,
	selectIsLoggedIn: PropTypes.any,
}

function mapStateToProps(state) {
	return {
		selectIsLoggedIn: state.app.get('isLoggedIn'),
	}
}

export default connect(mapStateToProps)(Admin)
