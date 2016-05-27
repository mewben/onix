import React, { Component } from 'react';

export default (ComposedComponent) => class extends Component {

	// sets the state of input
	// must be immutable
	__bindInput(key, attr, e) {
		let state = {};
		if (!Array.isArray(attr)) {
			attr = [attr];
		}

		state[key] = this.state[key].setIn(attr, e.currentTarget.value);
		this.setState(state);
	}

	// for checkbox
	__bindCheck(key, attr, e) {
		let state = {};
		if (!Array.isArray(attr)) {
			attr = [attr];
		}

		state[key] = this.state[key].setIn(attr, e.currentTarget.checked);
		this.setState(state);
	}

	// for SimpleSelect
	__bindSelect(key, attr, v) {
		let state = {};
		if (!Array.isArray(attr)) {
			attr = [attr];
		}

		state[key] = this.state[key].setIn(attr, v ? v.value : null);
		this.setState(state);
	}

	render() {
		return (
			<ComposedComponent
				__bindInput={this.__bindInput}
				__bindCheck={this.__bindCheck}
				__bindSelect={this.__bindSelect}
				{...this.props}
			/>
		);
	}

};
