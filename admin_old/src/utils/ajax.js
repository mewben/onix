import 'isomorphic-fetch';
import { ep } from 'config';

const ajax = {

	post: function(resource, payload) {
		console.log("resource", resource);
		console.log("payload:", payload);

		return fetch(
			ep + resource,
			{
				method: 'post',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			}).then(res => {
				if (res.ok) {
					return res.json();
				} else {
					return res.json()
						.then(err => {
							throw new Error(err.Error);
						});
				}
			}).then(json => {
				return json;
			});
	}

};

export default ajax;