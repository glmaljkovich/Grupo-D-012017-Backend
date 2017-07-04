
const RouterComponent = require('../app/router-component.js');
const Vuex            = require('vuex');
import VueI18n from 'vue-i18n';

require('../app/card-component.js');
require('../app/countdown-component.js');
require('../app/success-component.js');
require('../app/error-component.js');
require('../app/history-item-component.js');
require('../app/result-component.js');
require('../app/sidebar-component.js');
require('../app/login-form-component.js');
require('../app/list-item-component.js');
require('../app/product-component.js');

Vue.use(Vuex);
Vue.use(VueI18n);

var app = new RouterComponent();
app.$mount('#app');

$(document).foundation();
