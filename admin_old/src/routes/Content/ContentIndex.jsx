import React, { Component } from 'react';

import Header from '../../partials/Header';
import Title from '../../partials/Title';
import Buttons from './components/Buttons';

class ContentIndex extends Component {

	render() {
		return (
			<div className="col-xs-12">
				<Header
					title={<Title title="Content" />}
					buttons={<Buttons />}
				/>
				ContentList
			</div>
		);
	}
}

export default ContentIndex;
