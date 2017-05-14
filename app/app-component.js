const SessionService = require('./session-service.js');
const HTTP = require('./http.js');
const User = require('./user.js');

let AppComponent = Vue.extend({

  data: function(){
    return {
      user: null,
      sessionService: new SessionService(),
      error: null,
      lists: []
    };
  },
  watch:{
    user: function(user){
      if(user === null){
        this.lists = [];
      } else {
        this.getShoppingLists(user);
      }
    }
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
      .catch(error => {
        this.error = error.response.data;
      });

    },
    logout: function(){
      this.user = null;
      this.sessionService.closeSession();
    },
    register: function(register){
      HTTP.post(`user`, register)
      .then(token => {
        let user = new User(register.username, token);
        this.sessionService.saveSession(user.username, user.token);
        this.user = user;
      })
      .catch(error => {
        this.error = error.response.data;
      });
    },
    errorRead: function(){
      this.error = null;
    },
    getShoppingLists: function(user){
      HTTP.get('shoppingList/' + user.username)
      .then(response => {
        this.lists = response.data;
      })
      .catch(error => {
        console.log("ERROR");
        this.error = error.response.data;
      });
    }
  }
});

module.exports = AppComponent;
