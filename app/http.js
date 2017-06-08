const axios = require('axios');
const SessionService = require('./session-service.js');

const HTTP = axios.create({
  baseURL: 'https://desapp-backend.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});
HTTP.defaults.baseURL = 'https://desapp-backend.herokuapp.com';
HTTP.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const sessionService = new SessionService();

HTTP.interceptors.request.use(function(config) {
  let token = sessionService.getSession().token;
    console.log(token);
    if(token !== null){
      config.headers.Authorization = 'Bearer ' + token;
    }

  return config;
},
function(err) {
  return Promise.reject(err);
});


module.exports = HTTP;

// https://desapp-backend.herokuapp.com
