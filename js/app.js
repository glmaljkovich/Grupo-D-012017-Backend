const RouterComponent = require('../app/router-component.js');

require('../app/card-component.js');
require('../app/result-component.js');
require('../app/user-detail-component.js');
require('../app/login-form-component.js');
require('../app/list-item-component.js');

var app = new RouterComponent();
app.$mount('#app');

$(document).foundation();
