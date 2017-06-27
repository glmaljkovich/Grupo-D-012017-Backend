const HTTP = require('./http.js');
const User = require('./user.js');
const LockService = require('./lock.js');

let HomeComponent = Vue.component('home',{
  template:`
  <div class="off-canvas-content" data-off-canvas-content>
    <div class="content" v-if="user">
      <div class="small-12 columns">
        <h4 class="title">My Shopping Lists</h4>
        <p v-if="lists == [] || lists == '' " class="subheader">No tienes listas aun. Crea una nueva!</p>
      </div>
      <div>
        <!-- Shopping List -->
        <card v-for="list in lists" :shoppinglist="list" v-on:open="open"></card>
      </div>
      <button type="button" name="button" class="fab" data-open="add2">+</button>
    </div>
    <!-- Login Form -->
    <login-form v-else v-on:login="login" v-on:register="register" ></login-form>
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
    return {
      sessionService: this.$store.state.sessionService,
      newShoppingListName: ''
    };
  },
  watch:{
    user: function(user){
      if(user === null){
        this.$store.commit('clearLists');
      } else {
        this.getShoppingLists(user);
      }
    }
  },
  computed:{
    user: function(){
      return this.$store.state.user;
    },
    lists: function(){
      return this.$store.state.lists;
    }
  },
  created: function(){
    if(this.sessionService.hasSession()){
      this.$store.commit('setUser', this.sessionService.getSession());
    }
    LockService.router = this.$router;
  },
  mounted: function(){
    $('.off-canvas-content').foundation();
  },
  methods: {
    login: function(){
      LockService.lock.show();
    },
    register: function(register){
      HTTP.post(`user`, register)
          .then(token => {
            let user = new User(register.username, token.data);
            this.sessionService.saveSession(user.username, user.token);
            this.$store.commit('setUser', user);
          })
          .catch(error => {
            this.$store.commit("setError", error.response.data);
          });
    },
    getShoppingLists: function(user){
      HTTP.get('shoppingList/' + user.username)
          .then(response => {
            this.$store.commit('setLists', response.data);
          })
          .catch(error => {
            this.$store.commit("setError", error.response.data);
          });
    },
    open: function(shoppingList){
      this.$store.commit('setShoppingList', shoppingList);
    },
    createList: function(){
      let list = {
        name: this.newShoppingListName,
        items: []
      };

      HTTP.post('shoppingList/' + this.user.username, list)
          .then(response => {
            list.id = response.data;
            this.$store.commit('addList', list);
            this.newShoppingListName = '';
          })
          .catch(error => {
            this.$store.commit("setError", error.response.data);
          });
    }
  }
});

module.exports = HomeComponent;
