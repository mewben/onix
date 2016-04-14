import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
require('codemirror/mode/htmlmixed/htmlmixed');

import EditorActionBar from './EditorActionBar';
import Accordion from './Accordion';
import Icon from './Icon';
import EditorTags from './EditorTags';

class Editor extends Component {

	_onSubmit() {
		console.log('submit');
		console.log(this.refs.body._currentCodemirrorValue);
	}

	render() {
		let editor_options = {
			mode: 'htmlmixed',
			lineNumbers: false
		};

		return (
			<div className="row editor">
				<div className="col-lg-9">
					<div className="post-editor__content">
						<EditorActionBar />
						<div className="editor__title">
							<input
								id="input-title"
								className="form-control"
								type="text"
								placeholder="Title"
								autoFocus
							/>
							<ul className="editor__switch-mode segmented-control is-compact">
								<li className="segmented-control__item">
									<a className="segmented-control__link">
										<span className="segmented-control__text">Visual</span>
									</a>
								</li>
								<li className="segmented-control__item is-selected">
									<a className="segmented-control__link">
										<span className="segmented-control__text">HTML</span>
									</a>
								</li>
							</ul>
						</div>
						<div className="content-textarea">
							<CodeMirror
								ref="body"
								value="var x = 12 + c();"
								options={editor_options}
							/>
						</div>
					</div>
				</div>
				<div className="col-lg-3">
					<div className="post-editor__sidebar">
						<Accordion title="Actions" isExpanded>
							<div className="text-center">
								<div className="btn-group btn-group-sm">
									<button type="button" className="btn btn-info-outline" onClick={this._onSubmit.bind(this)}>Publish</button>
									<button type="button" className="btn btn-info-outline">Save as Draft</button>
								</div>
							</div>
							<hr/>
							<div className="form-group">
								<label>Date Published:</label>
								<div className="input-icon">
									<Icon name="calendar" size="18" />
									<input type="text" className="form-control" placeholder="Date Published" />
									<div className="text-muted text-right">YYYY-MM-DD HH:mm</div>
								</div>
							</div>
							<div className="form-group">
								<label>Content URL:</label>
								<div className="input-icon">
									<Icon name="link" size="18" />
									<input type="text" className="form-control" placeholder="Slug" />
									<div className="text-muted text-right">http://localhost:1300/content-url</div>
								</div>
							</div>
							<div className="form-group">
								<label>Image URL:</label>
								<div className="input-icon">
									<Icon name="image" size="18" />
									<input type="text" className="form-control" placeholder="Image URL" />
								</div>
							</div>
						</Accordion>
						<Accordion title="Tags" isExpanded>
							<EditorTags
								tags={[{id: 1, name: 'Almost'}]}
							/>
						</Accordion>
						<Accordion title="Content Type" subtitle="Post">
							<ul className="nav content-type">
								<li>
									<label>
										<input type="radio" name="type" className="form-radio" /> Post
									</label>
								</li>
								<li>
									<label>
										<input type="radio" name="type" className="form-radio" /> Page
									</label>
								</li>
								<li>
									<label>
										<input type="radio" name="type" className="form-radio" /> Image
									</label>
								</li>
								<li>
									<label>
										<input type="radio" name="type" className="form-radio" /> Video
									</label>
								</li>
								<li>
									<label>
										<input type="radio" name="type" className="form-radio" /> Gallery
									</label>
								</li>
							</ul>
						</Accordion>
						<Accordion title="SEO">
							<p>Meta Title</p>
						</Accordion>
					</div>
				</div>
			</div>
		);
	}
}

export default Editor;