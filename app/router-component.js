const HomeComponent         = require('./home-component.js');
const HistoryComponent      = require('./history-component.js');
const ShoppingListComponent = require('./shopping-list-component.js');
const AdminComponent        = require('./admin-component.js');
// const ProfileComponent      = require('./profile-component.js');
const store                 = require('./store.js');
const i18n                  = require('./i18n.js');
import Profile from './Profile.vue';

var router = new VueRouter({
    routes: [
      {path: '/', redirect:'/home'},
      {path: '/profile', component: Profile},
      {path: '/home', component: HomeComponent},
      {path: '/admin', component: AdminComponent},
      {path: '/home/shoppinglist/:id', component: ShoppingListComponent},
      {path: '/history', component: HistoryComponent}
    ]
});

let RouterComponent = Vue.extend({
  i18n,
  router,
  store,
  data: function(){
    return {state: store.state};
  },
  methods:{
    logout: function(){
      this.$store.commit('clearUser');
      this.$store.commit('closeSession');
      this.$router.push('/home');
    },
  }
});

module.exports = RouterComponent;
