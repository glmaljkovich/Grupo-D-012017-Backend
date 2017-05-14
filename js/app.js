const AppComponent = require('../app/app-component.js');
// Vue.http.options.root = 'http://localhost:8080';
// Vue.http.headers.common['Access-Control-Allow-Origin'] = '*';
// Vue.http.headers.post['Content-Type'] = 'application/json';

require('../app/card-component.js');
require('../app/user-detail-component.js');
require('../app/login-form-component.js');


var app = new AppComponent();
app.$mount('#app');

$(document).foundation();
