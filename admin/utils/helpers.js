// converts object to query parameters
export const serialize = (obj) => {
	if (typeof obj !== 'object') { return obj }
	let pairs = []
	for (let key in obj) {
		if (obj[key] != null) {
			pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
		}
	}
	return pairs.join('&')
}

// slugify string
export const slugify = (str, replacement = '-') => {
	return str.toLowerCase().replace(/[-\s]+/g, replacement)
}
