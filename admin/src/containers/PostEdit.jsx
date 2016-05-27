import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
// import yup from 'yup';

import FormPost from '../components/FormPost';
import { getUTCTime } from '../actions/AppActions';
import { fetchTags } from '../actions/TagActions';

// const requiredMsg = 'This is a required field.';
/* const schema = yup.object({
	id: yup.number(),
	title: yup.string().required(requiredMsg),
	slug: yup.string(),
	subtitle: yup.string(),
	body: yup.string(),
	published_at: yup.string(),
	image: yup.string(),
	tags: yup.string()
}); */
const model = new Map({
	id: 0,
	title: '',
	slug: '',
	subtitle: '',
	body: '',
	published_at: '',
	image: '',
	tags: [{
		id: 1,
		name: 'Hello World',
		slug: 'hello-world'
	}, {
		id: 2,
		name: 'SDE',
		slug: 'sde'
	}]
});

class PostEdit extends Component {

	constructor(props) {
		super(props);

		this.state = {
			model: model
		};
	}

	/* componentWillMount() {
		this.props.getUTCTime()
			.then((res) => {
				let { model } = this.state;
				model.published_at = res.action.payload;
				this.setState({
					model: model
				});
				// fetch tags if not fetched
				if (!this.props.tag.isFetched) {
					return this.props.fetchTags();
				}
			}).catch(() => null);
	} */

	_onSubmit = (input, draft) => {
		console.log(this.state.model);
		console.log('dreaft?', draft);
	};

	render() {
		let { model } = this.state;

		return (
			<FormPost
				value={model}
				handleSubmit={this._onSubmit}
			/>
		);
	}
}

PostEdit.propTypes = {
	getUTCTime: PropTypes.func,
	tag: PropTypes.object,
	fetchTags: PropTypes.func
};

function mapStateToProps(state) {
	return {
		tag: state.tag
	};
}

export default connect(
	mapStateToProps,
	{ getUTCTime, fetchTags }
)(PostEdit);
