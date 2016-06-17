import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Notify from 'react-notification-system'

import { hideNotification } from 'containers/App/actions'

class Notification extends Component {

	componentWillReceiveProps(nextProps) {
		if (nextProps.selectNotif.get('show')) {
			this.refs.notify.addNotification(nextProps.selectNotif.toJS())

			setTimeout(() => {
				this.props.hideNotification()
			}, 100)
		}
	}

	render() {
		return (
			<Notify ref="notify" style={false} />
		)
	}
}

Notification.propTypes = {
	selectNotif: PropTypes.object,
	hideNotification: PropTypes.func,
}

function mapStateToProps(state) {
	return {
		selectNotif: state.app.get('notif'),
	}
}

export default connect(
	mapStateToProps,
	{ hideNotification }
)(Notification)
