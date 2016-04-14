export default function linkImmutable(target) {
	target.prototype.linkState = function(key, attr, event) {
		let state = {},
			value = event.currentTarget.value;

		state[key] = this.state[key].set(attr, value);

		this.setState(state);
	};

	return target
}