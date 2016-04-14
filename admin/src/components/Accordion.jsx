import React, { Component } from 'react';
import classNames from 'classnames';

class Accordion extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isExpanded: props.isExpanded || false
		};
	}

	toggleExpanded() {
		let isExpanded = ! this.state.isExpanded;

		this.setState({
			isExpanded:isExpanded
		});

		//this.props.onToggle( isExpanded );
	}

	_renderIcon() {
		if ( ! this.props.icon ) {
			return;
		}

		if ( 'string' === typeof this.props.icon ) {
			return <span className={ classNames( 'accordion__icon', this.props.icon ) } />;
		}

		return <span className="accordion__icon">{ this.props.icon }</span>;
	}

	_renderSubtitle() {
		if ( this.props.subtitle ) {
			return <span className="accordion__subtitle">{ this.props.subtitle }</span>;
		}
	}

	_renderHeader() {
		const { title } = this.props;

		return (
			<header className="accordion__header">
				<button
					type="button"
					className="accordion__toggle"
					onTouchTap={ this.toggleExpanded.bind(this) }
				>
					{ this._renderIcon() }
					<span className="accordion__title">{ title }</span>
					{ this._renderSubtitle() }
				</button>
			</header>
		);
	}

	render() {
		const { children } = this.props;
		const classes = classNames( 'accordion', this.props.className, {
			'is-expanded': this.state.isExpanded
		} );

		return (
			<div className={ classes }>
				{ this._renderHeader() }
				<div ref="content" className="accordion__content">
					<div className="accordion__content-wrap">
						{ children }
					</div>
				</div>
			</div>
		);
	}
}

export default Accordion;