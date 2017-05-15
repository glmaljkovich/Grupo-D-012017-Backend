const axios = require('axios');
const HTTP = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json'
  }
});
HTTP.defaults.headers.post.Origin = 'http://localhost:80';
HTTP.defaults.headers.common.Origin = 'http://localhost:80';

module.exports = HTTP;
