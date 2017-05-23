const SessionService        = require('./session-service.js');
const HomeComponent         = require('./home-component.js');
const ShoppingListComponent = require('./shopping-list-component.js');
var state = {
  user: null,
  sessionService: new SessionService(),
  error: null,
  lists: [],
  shoppinglist: null,
  newShoppingListName: null
};

var router = new VueRouter({
    base: 'http://localhost:80',
    routes: [
      {path: '/', component: HomeComponent},
      {path: '/shoppinglist/:id', component: ShoppingListComponent}
    ]
});

let RouterComponent = Vue.extend({
  router,
  data: function(){
    return {state: state};
  },
  methods:{
    logout: function(){
      this.state.user = null;
      this.state.sessionService.closeSession();
    },
  }
});

module.exports = RouterComponent;
