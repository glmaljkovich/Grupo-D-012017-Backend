const User = require('./user.js');

let SessionService = function(){};

SessionService.prototype.hasSession = function(){
  return localStorage.getItem('y_username') !== null;
};

SessionService.prototype.saveSession = function(username, token){
  localStorage.setItem("y_username", username);
  localStorage.setItem("y_token", token);
};

/**
* @return {User}
*/
SessionService.prototype.getSession = function(){
  return new User(localStorage.getItem("y_username"), localStorage.getItem("y_token"));
};

SessionService.prototype.closeSession = function(){
  localStorage.clear();
};

module.exports = SessionService;
