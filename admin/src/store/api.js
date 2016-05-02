import 'isomorphic-fetch';
let serverport = '';

if (process.env.NODE_ENV !== 'production') {
	let env = require('root/env.json');
	serverport = 'http://' + env.SERVERPORT;
}

let APIROOT = serverport + '/api';

// check if is object
const _isObject = (obj) => {
	return obj === Object(obj);
};

// converts object to query parameters
const _serialize = (obj) => {
	if (!_isObject(obj)) { return obj; }
	let pairs = [];
	for (let key in obj) {
		if (obj[key] != null) {
			pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
		}
	}
	return pairs.join('&');
};

const ajax = (ep, method, body, query) => {
	let que = _serialize(query) || '';
	if (que) {
		ep = '?' + que;
	}
	let options = {
		method: method
	};

	if (body) {
		options.body = JSON.stringify(body);
	};
	return new Promise((resolve, reject) => {
		fetch(ep, options)
			.then((response) => {
				if (response.status > 400) {
					throw new Error(response.status + ' ' + response.statusText);
				}

				if (response.ok) {
					return resolve(response.json());
				} else {
					// json Error
					return response.json()
						.then((err) => {
							throw new Error(err.Error);
						});
				}
			}).catch((err) => {
				return reject(err.message);
			});
	});
};

export function post(resource, payload) {
	return ajax(APIROOT + resource, 'post', payload);
}

export function get(resource, payload) {
	return ajax(APIROOT + resource, 'get', null, payload);
}
