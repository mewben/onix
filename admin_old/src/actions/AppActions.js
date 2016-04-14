import * as AT from '../constants/ActionTypes';

export function openNav() {
	return {
		type: AT.NAV_OPEN
	}
}

export function closeNav() {
	return {
		type: AT.NAV_CLOSE
	};
}
