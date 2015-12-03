import React, { Component } from 'react';

import Header from '../../../../partials/Header';
import FormContent from '../../../../components/FormContent';

import Title from '../../components/Title';

class ContentEdit extends Component {

	render() {
		return (
			<div className="col-xs-12">
				<Header
					title={<Title title="Edit Content" />}
				/>
				<FormContent />
			</div>
		);
	}
}

export default ContentEdit;
