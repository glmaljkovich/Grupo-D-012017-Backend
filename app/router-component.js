const HomeComponent         = require('./home-component.js');
const HistoryComponent      = require('./history-component.js');
const ShoppingListComponent = require('./shopping-list-component.js');
const store                 = require('./store.js');

var router = new VueRouter({
    base: 'http://localhost:80',
    routes: [
      {path: '/', redirect:'/home'},
      {path: '/home', component: HomeComponent},
      {path: '/home/shoppinglist/:id', component: ShoppingListComponent},
      {path: '/history', component: HistoryComponent}
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
