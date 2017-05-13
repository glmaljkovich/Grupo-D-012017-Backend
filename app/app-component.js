const SessionService = require('./session-service.js');

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
    login: function(user){
      this.user = user;
      this.sessionService.saveSession(user.username, user.pasword);
    },
    logout: function(){
      this.user = null;
      this.sessionService.closeSession();
    }
  }
});

module.exports = AppComponent;
