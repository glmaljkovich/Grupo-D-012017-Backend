const axios = require('axios');
const HTTP = axios.create({
  baseURL: 'https://desapp-backend.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});
HTTP.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

module.exports = HTTP;

// https://desapp-backend.herokuapp.com
