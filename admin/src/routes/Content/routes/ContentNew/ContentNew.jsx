import React, { Component } from 'react';
import Select from 'react-select';

import Editor from '../../../../components/Editor';
import Header from '../../../../partials/Header';

import Title from './Title';
import Buttons from './Buttons';

class ContentNew extends Component {

	render() {
		let tags = [
			{ value: 1, label: 'One' },
			{ value: 3, label: 'Three' }
		];
		let types = [
			{ value: 1, label: 'Post' },
			{ value: 3, label: 'Page' },
			{ value: 4, label: 'Image'}
		];

		return (
			<div className="col-xs-12">
				<Header
					title={<Title />}
					buttons={<Buttons />}
				/>
				<div className="row edge content">
					<div className="col-lg-8">
						<div className="form-group">
							<input
								className="form-control"
								placeholder="Title"
								autoFocus
							/>
						</div>
						<div className="form-group">
							<Editor
								value="Hello"
							/>
						</div>
					</div>
					<div className="col-lg-4">
						<div className="form-group">
							<label htmlFor="type">Content Type</label>
							<div className="input-icon">
								<Select
									id="type"
									options={types}
								/>
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="image">Image URL</label>
							<div className="input-icon">
								<input
									id="image"
									className="form-control"
								/>
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="url">Content URL</label>
							<div className="input-icon">
								<input
									id="url"
									className="form-control"
								/>
							</div>
							<small className="text-muted">localhost:1310/</small>
						</div>
						<div className="form-group">
							<label htmlFor="publish_date">Publish Date</label>
							<div className="input-icon">
								<input
									id="publish_date"
									className="form-control"
									value="2015-10-20 15:34"
								/>
							</div>
							<small className="text-muted">YYYY-MM-DD hh:mm</small>
						</div>
						<div className="form-group">
							<label htmlFor="tags">Tags</label>
							<div className="input-icon">
								<Select
									options={tags}
									allowCreate
									multi
								/>
							</div>
						</div>
						<div className="pd-tb">
							<hr/>
						</div>
						<div className="form-group">
							<label htmlFor="meta_title">Meta Title</label>
							<div className="input-icon">
								<input
									id="meta_title"
									className="form-control"
								/>
							</div>
							<small className="text-muted">Recommended: <strong>70</strong> characters: You've used <strong>0</strong></small>
						</div>
						<div className="form-group">
							<label htmlFor="meta_desc">Meta Description</label>
							<div className="input-icon">
								<textarea
									id="meta_desc"
									className="form-control"
									rows={5}
								/>
							</div>
							<small className="text-muted">Recommended: <strong>70</strong> characters: You've used <strong>0</strong></small>
						</div>
						<div className="form-group">
							<label htmlFor="seo_preview">Search Engine Result Preview</label>
							<div className="seo_preview">
								<p>http://localhost:1310/</p>
								<p>TItle</p>
								<p>Description</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ContentNew;
