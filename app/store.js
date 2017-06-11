const Vuex                  = require('vuex');
const SessionService        = require('./session-service.js');

let store = new Vuex.Store({
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

module.exports = store;
