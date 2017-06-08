const SessionService        = require('./session-service.js');
const HomeComponent         = require('./home-component.js');
const ShoppingListComponent = require('./shopping-list-component.js');
const Vuex                  = require('vuex');

const store = new Vuex.Store({
  state: {
    user: null,
    sessionService: new SessionService(),
    error: null,
    lists: [],
    shoppinglist: null,
    newShoppingListName: null
  },
  mutations: {
    setUser (state, user) {
      state.user = user;
    },
    clearUser(state){
      state.user = null;
    },
    setError(state, error){
      state.error = error;
    },
    setLists(state, lists){
      state.lists = lists;
    },
    setShoppingList(state, list){
      state.shoppinglist = list;
    },
    setNewShoppingListName(state, name){
      state.newShoppingListName = name;
    },
    closeSession(state){
      state.sessionService.closeSession();
    }
  }
});

var router = new VueRouter({
    base: 'http://localhost:80',
    routes: [
      {path: '/', component: HomeComponent},
      {path: '/shoppinglist/:id', component: ShoppingListComponent}
    ]
});

let RouterComponent = Vue.extend({
  router,
  store,
  data: function(){
    return {state: store.state};
  },
  methods:{
    logout: function(){
      this.$store.commit('clearUser');
      this.$store.commit('closeSession');
    },
  }
});

module.exports = RouterComponent;
