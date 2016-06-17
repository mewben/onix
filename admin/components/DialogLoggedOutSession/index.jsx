import React, { PropTypes, Component } from 'react'
import Modal from 'react-modal'

class DialogLoggedOutSession extends Component {

	_onClick = () => {
		window.location.href = '/admin/login'
	}

	render() {
		console.log('this.props', this.props)
		if (this.props.isLoggedOut) {
			return null
		}

		return (
			<div className="overlay">
				<Modal
					isOpen={true}
					className="modal-dialog modal-sm"
				>
					<div className="modal-content">
						<div className="modal-body">Your session has timed out. Please login again.</div>
						<div className="modal-footer">
							<button onClick={this._onClick} className="btn btn-warning btn-sm">Login Again</button>
						</div>
					</div>
				</Modal>
			</div>
		)
	}
}

DialogLoggedOutSession.propTypes = {
	isLoggedOut: PropTypes.bool,
}

export default DialogLoggedOutSession
