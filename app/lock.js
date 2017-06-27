var clientId        = "QiD9rdpY0DDKNbzbCo69noNgM5aklNNo";
var domain          = "glmaljkovich.auth0.com";
import Auth0Lock from 'auth0-lock';

var options = {
  auth: {
    responseType: "token"
  }
};

var lock            = new Auth0Lock(clientId, domain, options);
let SessionService  = require('./session-service.js');

let sessionService  = new SessionService();

lock.on("authenticated", function(authResult) {
  lock.getUserInfo(authResult.accessToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }
    sessionService.saveSession(profile.nickname, profile.user_metadata.token);
    console.log(profile);
    // LockService.router.replace('/home');
    location.reload(); 
    // Update DOM
  });
});

var LockService = {
  lock: lock,
  router: null
};

module.exports = LockService;
