import React, { PropTypes } from 'react'
import { Form, Field } from 'react-redux-form'
import Button from 'react-bootstrap/lib/Button'

import { required } from 'utils/validators'
import ErrBlock from 'components/ErrBlock'

const validators = {
	username: { required },
	password: { required },
}

const FormLogin = ({isPending, isValid, onSubmit}) => {
	let submit = isPending ? 'Authenticating...' : 'Login'

	return (
		<Form
			model="loginModel"
			validators={validators}
			onSubmit={onSubmit}
			className="text-left"
		>
			<fieldset legend={' '}>
				<div className="form-group">
					<Field model="loginModel.username">
						<input
							type="text"
							className="form-control"
							autoComplete="off"
							placeholder="Username"
							autoFocus />
					</Field>
					{ErrBlock('loginModel.username')}
				</div>
				<div className="form-group">
					<Field model="loginModel.password">
						<input
							type="password"
							placeholder="Password"
							className="form-control" />
					</Field>
					{ErrBlock('loginModel.password')}
				</div>
				<div className="p-t-2 text-right">
					<Button
						disabled={!isValid || isPending}
						bsStyle="info"
						type="submit">{submit}</Button>
				</div>
			</fieldset>
		</Form>
	)
}

FormLogin.propTypes = {
	isPending: PropTypes.bool,
	isValid: PropTypes.bool,
	onSubmit: PropTypes.func,
}

export default FormLogin
