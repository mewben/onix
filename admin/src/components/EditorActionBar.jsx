import React from 'react';
import Link from 'react-router/lib/Link';

import Icon from './Icon';

const EditorActionBar = () => (
	<div className="editor__action-bar">
		<section>
			<Link to="/content" className="btn-borderless">
				<Icon name="left" size="18" /> All Content
			</Link>
		</section>
		<div className="text-center">New Content</div>
		<section className="text-right">Icons</section>
	</div>
);

export default EditorActionBar;