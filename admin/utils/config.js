let isProduction = process.env.NODE_ENV === 'production'

const HOST = isProduction ? '' : 'http://' + require('base/env.json').SERVERPORT

const API = HOST + '/api'

export { HOST, API }
