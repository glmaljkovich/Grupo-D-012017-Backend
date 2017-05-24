const SessionService = require('./session-service.js');
const HTTP = require('./http.js');
const User = require('./user.js');

let HomeComponent = Vue.component('home',{
  template:`
  <div class="off-canvas-content" data-off-canvas-content>
    <div class="content" v-if="user">
      <div class="small-12 columns">
        <h4 class="title">My Shopping Lists</h4>
      </div>
      <div>
        <!-- Shopping List -->
        <card v-for="list in lists" :shoppinglist="list" v-on:open="open"></card>
      </div>
    </div>
    <!-- Login Form -->
    <login-form v-else v-on:login="login" v-on:register="register" :error="error" v-on:error-read="errorRead"></login-form>
    <button type="button" name="button" class="fab" data-open="add2">+</button>
    <!-- Add shoppinglist modal -->
    <div class="reveal" id="add2" data-reveal>
      <h4><b>Add new Shopping List</b></h4>
      <input type="text" name="name" v-model="newShoppingListName" placeholder="Enter a name...">
      <button class="close-button" data-close aria-label="Close modal" type="button">
        <span aria-hidden="true">&times;</span>
      </button>
      <button class="button hollow alert" @click="createList" data-close>OK</button>
    </div>
  </div>
  `,
  data: function(){
    return this.$parent.state;
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
    $('.off-canvas-content').foundation();
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
    },
    open: function(shoppingList){
      this.shoppinglist = shoppingList;
    },
    createList: function(){
      let list = {
        name: this.newShoppingListName,
        items: []
      };

      HTTP.post('shoppingList/' + this.user.username, list)
          .then(response => {
            list.id = response.data;
            this.lists.push(list);
          })
          .catch(error => {
            this.error = error.response.data;
          });
    }
  }
});

module.exports = HomeComponent;
