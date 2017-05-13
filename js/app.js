const AppComponent = require('../app/app-component.js')
require('../app/card-component.js')
require('../app/user-detail-component.js')
require('../app/login-form-component.js')

let app = new AppComponent();
app.$mount('#app');

$(document).foundation();
