import React, { Component } from 'react';
import cn from 'classnames';

import map from 'lodash/collection/map';

class SuggestionsList extends Component {

	_handleHover(suggestion) {
		if ( ! this._scrollingIntoView ) {
			this.props.onHover( suggestion );
		}
	}

	_computeSuggestionMatch(suggestion) {
		let match = ( this.props.match || '' ).toLocaleLowerCase(),
			indexOfMatch;

		if ( match.length === 0 ) {
			return null;
		}

		//suggestion = this.props.valueTransform( suggestion );
		indexOfMatch = suggestion.toLocaleLowerCase().indexOf( match );

		return {
			suggestionBeforeMatch: suggestion.substring( 0, indexOfMatch ),
			suggestionMatch: suggestion.substring( indexOfMatch, indexOfMatch + match.length ),
			suggestionAfterMatch: suggestion.substring( indexOfMatch + match.length )
		};
	}

	_renderSuggestions() {
		return map( this.props.suggestions, (suggestion, index ) => {
			let match = this._computeSuggestionMatch( suggestion ),
				classes = cn( 'token-field__suggestion', {
					'is-selected': index === this.props.selectedIndex
				} );

			return (
				<li
					className={ classes }
					key={ suggestion }
					onClick={ this.props.onSelect.bind(this, suggestion ) }
					onMouseEnter={ this._handleHover.bind(this, suggestion ) }>
					{ match ?
						<span>
							{ match.suggestionBeforeMatch }
							<strong className="token-field__suggestion-match">
								{ match.suggestionMatch }
							</strong>
							{ match.suggestionAfterMatch }
						</span>
					:
						suggestion
					}
				</li>
			);
		});
	}

	render() {
		let classes = cn( 'token-field__suggestions-list', {
			'is-expanded': this.props.isExpanded && this.props.suggestions.length > 0
		} );

		console.log(this.props);

		// We set `tabIndex` here because otherwise Firefox sets focus on this
		// div when tabbing off of the input in `TokenField` -- not really sure
		// why, since usually a div isn't focusable by default
		// TODO does this still apply now that it's a <ul> and not a <div>?
		return (
			<ul className={ classes } tabIndex="-1">
				{ this._renderSuggestions() }
			</ul>
		);
	}
}

export default SuggestionsList;