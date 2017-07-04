const Vuex                  = require('vuex');
const SessionService        = require('./session-service.js');

let store = new Vuex.Store({
  state: {
    user: null,
    sessionService: new SessionService(),
    error: null,
    message: null,
    lists: [],
    shoppinglist: null
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
    setMessage(state, message){
      state.message = message;
    },
    setLists(state, lists){
      state.lists = lists;
    },
    clearLists(state){
      state.lists = [];
    },
    addList(state, list){
      state.lists.push(list);
    },
    removeList(state, list){
      state.lists = state.lists.filter(elem => elem !== list);
    },
    setShoppingList(state, list){
      state.shoppinglist = list;
    },
    closeSession(state){
      state.sessionService.closeSession();
    }
  }
});

module.exports = store;
