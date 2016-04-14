import React, { Component } from 'react';

class FormLogin extends Component {

	render() {
		return (
			<div className="wrapper">
				<div className="logo">O<small>nix.</small></div>
				<form>
					<h2>Login Form</h2>
					<div className="danger">Wrong credentials.</div>
					<input
						type="text"
						className="form-control"
						placeholder="Username"
						autoCapitalize="off"
						autoFocus
					/>
					<input
						type="password"
						className="form-control"
						placeholder="Password"
					/>
					<br />
					<button
						type="submit"
						className="btn btn-primary-outline btn-block"
					>Login</button>
					<footer>
						Onix. v0.1.0<br />
						All Rights Reserved.
					</footer>
				</form>
			</div>
		);
	}
}

export default FormLogin;