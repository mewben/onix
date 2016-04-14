import React, { Component } from 'react';
import cn from 'classnames';

import clone from 'lodash/lang/clone';
import contains from 'lodash/collection/contains';
import each from 'lodash/collection/each';
import take from 'lodash/array/take';

import Token from './Token';
import TokenInput from './TokenInput';
import SuggestionsList from './SuggestionsList';

class TokenField extends Component {

	constructor(props) {
		super(props);

		this.state = {
			incompleteTokenValue: '',
			inputOffsetFromEnd: 0,
			isActive: false,
			selectedSuggestionIndex: -1,
			selectedSuggestionScroll: false
		};
	}

	__isEmptyOrWhitespace() {
		return /^\s*$/.test( this.state.incompleteTokenValue );
	}

	__getMatchingSuggestions() {
		let { suggestions } = this.props,
			match = this.state.incompleteTokenValue,
			startsWithMatch = [],
			containsMatch = [];

		if (match.length > 0) {
			match = match.toLocaleLowerCase();

			each(suggestions, (suggestion) => {
				let index = suggestion.toLocaleLowerCase().indexOf( match );

				if ( this.props.value.indexOf( suggestion ) === -1 ) {
					if ( index === 0 ) {
						startsWithMatch.push( suggestion );
					} else if ( index > 0 ) {
						containsMatch.push( suggestion );
					}
				}
			});

			suggestions = startsWithMatch.concat( containsMatch );
		}
		console.log(suggestions);
		return take( suggestions, this.props.maxSuggestions );
	}

	_getSelectedSuggestion() {
		if ( this.state.selectedSuggestionIndex !== -1 ) {
			return this._getMatchingSuggestions()[ this.state.selectedSuggestionIndex ];
		}
	}

	_onSuggestionSelected(suggestion) {
		this._addNewToken(suggestion);
	}

	_getIndexOfInput() {
		return this.props.value.length - this.state.inputOffsetFromEnd;
	}

	_onClick() {
		this.setState({
			isActive: true
		});
	}

	_onBlur() {
		this.setState({
			isActive: false
		});
	}

	_onKeyDown(e) {
		let preventDefault = false;

		switch(e.keyCode) {
			case 13: // enter/return
				preventDefault = this._addCurrentToken();
				break;
			default:
				break;
		}

		if (preventDefault) {
			e.preventDefault();
		}
	}

	_addNewToken(token) {
		let newValue;

		if ( ! contains( this.props.value, token ) ) {
			newValue = clone( this.props.value );
			newValue.splice( this._getIndexOfInput(), 0, token );

			this.props.onChange( newValue );
		}

		this.setState( {
			incompleteTokenValue: '',
			selectedSuggestionIndex: -1,
			selectedSuggestionScroll: false
		} );
	}

	_addCurrentToken() {
		let preventDefault = false,
			isInputEmpty = this.__isEmptyOrWhitespace(),
			selectedSuggestion = this._getSelectedSuggestion();

		if ( selectedSuggestion ) {
			this._addNewToken( selectedSuggestion );
			preventDefault = true;
		} else if ( ! isInputEmpty ) {
			this._addNewToken( this.state.incompleteTokenValue );
			preventDefault = true;
		}

		return preventDefault;
	}

	_onInputChange(e) {
		this.setState({
			incompleteTokenValue: e.target.value
		});
	}

	_renderToken(token) {
		return (
			<Token
				key={'token-' + token}
				value={token}
			/>
		);
	}

	_renderInput() {
		let { incompleteTokenValue, isActive } = this.state;

		return (
			<TokenInput
				ref="input"
				key="input"
				value={incompleteTokenValue}
				isActive={isActive}
				onChange={this._onInputChange.bind(this)}
			/>
		);
	}

	_renderTokensAndInput() {
		const { value } = this.props;

		let components = value.map((token) => {
			return this._renderToken(token);
		});

		components.splice(this._getIndexOfInput(), 0, this._renderInput());

		return components;
	}

	render() {
		let classes = cn('token-field', {
			'is-active': this.state.isActive
		});

		console.log("index:", this.props);

		return (
			<div
				className={classes}
				tabIndex="-1"
				onBlur={this._onBlur.bind(this)}
				onFocus={this._onClick.bind(this)}
				onKeyDown={this._onKeyDown.bind(this)}
			>
				<div
					className="token-field__input-container"
					tabIndex="-1"
					//onClick={this._onClick.bind(this)}
				>
					{this._renderTokensAndInput()}
				</div>
				<SuggestionsList
					suggestions={this.__getMatchingSuggestions()}
					isExpanded={this.state.isActive}
					onSelect={this._onSuggestionSelected.bind(this)}
				/>
			</div>
		);
	}
}

export default TokenField;