import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import FormLogin from './formLogin'
import { authLogin } from 'containers/App/actions'

class Login extends Component {

	_onSubmit = (input) => {
		this.props.authLogin(input)
			.then((res) => {
				if (!res.error) {
					// redirect to '/'
					this.context.router.replace('/')
				}
			})
	}

	render() {
		const {
			selectError,
			selectLoading,
			selectValidForm,
		} = this.props

		return (
			<div className="login overlay">
				<div className="overlay-dialog">
					<h3 className="overlay-title">Onix</h3>
					<div className="overlay-content">
						{ !!selectError && <p className="text-danger italic">{selectError}</p> }
						<FormLogin
							isPending={selectLoading}
							isValid={selectValidForm}
							onSubmit={this._onSubmit} />
						<hr/>
						<small className="text-muted">
							<strong>A Simple Blogging Platform.</strong>
						</small>
					</div>
				</div>
			</div>
		)
	}
}

Login.contextTypes = {
	router: PropTypes.object,
}

Login.propTypes = {
	selectError: PropTypes.string,
	selectLoading: PropTypes.bool,
	selectValidForm: PropTypes.bool,
	authLogin: PropTypes.func,
}

function mapStateToProps(state) {
	return {
		selectError: state.app.get('error'),
		selectLoading: state.app.get('loading'),
		selectValidForm: state.loginForm.valid,
	}
}

export default connect(
	mapStateToProps,
	{ authLogin }
)(Login)
