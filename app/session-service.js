let SessionService = function(){};

SessionService.prototype.hasSession = function(){
  return localStorage.getItem('y_username') !== null;
};

SessionService.prototype.saveSession = function(username, password){
  localStorage.setItem("y_username", username);
  localStorage.setItem("y_pass", password);
};

/**
* @return {User}
*/
SessionService.prototype.getSession = function(){
  return {
    username: localStorage.getItem("y_username"),
    password: localStorage.getItem("y_pass")
  };
};

SessionService.prototype.closeSession = function(){
  localStorage.clear();
};

module.exports = SessionService;
