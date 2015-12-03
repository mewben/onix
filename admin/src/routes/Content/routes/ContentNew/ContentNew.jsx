import React, { Component, PropTypes } from 'react';

//import Header from '../../../../partials/Header';
import FormContent from '../../../../components/FormContent';

//import Title from '../../components/Title';
//import Buttons from './Buttons';

class ContentNew extends Component {

	static propTypes = {
		history: PropTypes.object
	}

	render() {
		let { history } = this.props;
		let tags = [
			{ value: 1, label: 'One' },
			{ value: 3, label: 'Three' }
		];
		let types = [
			{ value: 'post', label: 'Post' },
			{ value: 'page', label: 'Page' },
			{ value: 'image', label: 'Image'}
		];

		return (
			<FormContent
				history={history}
				types={types}
				tags={tags}
				isNew
			/>
		);
/*
		return (
			<div className="col-xs-12">
				<FormContent
					history={history}
					tags={tags}
					types={types}
					isNew
				/>{ /*
				<Header
					title={<Title title="New Content" />}
					buttons={<Buttons onSubmit={this._onSubmit} />}
				/>
				<FormContent
					history={history}
					tags={tags}
					types={types}
					isNew
				/> }
			</div>
		); */
	}
}

export default ContentNew;
