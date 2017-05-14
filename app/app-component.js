const SessionService = require('./session-service.js');
const HTTP = require('./http.js');
const User = require('./user.js');

let AppComponent = Vue.extend({

  data: function(){
    return {
      user: null,
      sessionService: new SessionService(),
      lists: [
        {name: "Picada con amigos", list: [1,1,1,1,1,1,1,1,1,1,1,1]},
        {name: "Semana Santa", list: [1,1,1,1,1,1,1,1,1]}
     ]
    };
  },
  created: function(){
    if(this.sessionService.hasSession()){
      this.user = this.sessionService.getSession();
    }
  },
  mounted: function(){

  },
  methods: {
    login: function(login){
      HTTP.post(`user/login`, login)
      .then(token => {
        let user = new User(login.username, token);
        this.sessionService.saveSession(user.username, user.token);
        this.user = user;
      })
      .catch(e => {
        console.log(e);
      });

    },
    logout: function(){
      this.user = null;
      this.sessionService.closeSession();
    }
  }
});

module.exports = AppComponent;
