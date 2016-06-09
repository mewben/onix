import { fromJS } from 'immutable'

import { HOST, API } from 'utils/config'
import { serialize } from 'utils/helpers'

const request = () => {
	return fromJS({
		headers: { 'Content-Type': 'application/json' },
	})
}

const api_request = () => {
	let req = request()
	return req.setIn(['headers', 'Authorization'], 'Bearer ' + localStorage.getItem('jwt'))
}

export const authenticate = (credentials) => {
	let req = {
		endpoint: HOST + '/auth/login',
		method: 'POST',
		body: JSON.stringify(credentials),
	}

	return request().merge(fromJS(req)).toJS()
}

export const logout = () => {
	let req = {
		endpoint: API + '/auth/logout',
		method: 'POST',
		body: JSON.stringify({rft: localStorage.getItem('rft')}),
	}

	return api_request().merge(fromJS(req)).toJS()
}

export const delegate = () => {
	let session = JSON.parse(localStorage.getItem('session'))
	let body = {
		rft: localStorage.getItem('rft'),
		sub: Number(localStorage.getItem('isLoggedIn')),
		semcamp_id: Number(session.semcamp_id),
		campus_id: Number(session.campus_id),
	}
	let req = {
		endpoint: HOST + '/auth/delegation',
		method: 'POST',
		body: JSON.stringify(body),
	}

	return request().merge(fromJS(req)).toJS()
}

export const get = (ep, query) => {
	let que = serialize(query) || ''
	if (que) {
		ep = ep + '?' + que
	}
	let req = {
		endpoint: API + ep,
		method: 'GET',
	}

	return api_request().merge(fromJS(req)).toJS()
}

export const post = (ep, payload) => {
	let req = {
		endpoint: API + ep,
		method: 'POST',
		body: JSON.stringify(payload),
	}

	return api_request().merge(fromJS(req)).toJS()
}

export const put = (ep, payload) => {
	let req = {
		endpoint: API + ep,
		method: 'PUT',
		body: JSON.stringify(payload),
	}

	return api_request().merge(fromJS(req)).toJS()
}
