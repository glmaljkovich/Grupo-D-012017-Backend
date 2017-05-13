/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const SessionService = __webpack_require__(4);

let AppComponent = Vue.extend({

  data: function(){
    return {
      user: null,
      sessionService: new SessionService(),
      lists: [
        {name: "Picada con amigos", list: [1,1,1,1,1,1,1,1,1,1,1,1]},
        {name: "Semana Santa", list: [1,1,1,1,1,1,1,1,1]}
     ]
    };
  },
  created: function(){
    if(this.sessionService.hasSession()){
      this.user = this.sessionService.getSession();
    }
  },
  mounted: function(){

  },
  methods: {
    login: function(user){
      this.user = user;
      this.sessionService.saveSession(user.username, user.pasword);
    },
    logout: function(){
      this.user = null;
      this.sessionService.closeSession();
    }
  }
});

module.exports = AppComponent;


/***/ }),
/* 1 */
/***/ (function(module, exports) {


Vue.component('card', {
  template: `
  <div class="small-12 medium-4 columns  end">
    <div class="shoppinglist">
      <div class="float-left icon">
        <span class="fa-stack fa-lg">
          <i class="fa fa-circle fa-stack-2x"></i>
          <i class="fa fa-shopping-cart fa-stack-1x fa-inverse"></i>
        </span>
      </div>
      <div>
        <h5>{{shoppinglist.name}}</h5>
        <p>{{shoppinglist.list.length}} products</p>
      </div>
    </div>
  </div>`,
  props:['shoppinglist'],
  methods: {

  }
});


/***/ }),
/* 2 */
/***/ (function(module, exports) {


Vue.component('login-form', {
  template: `
  <div class="small-12 columns">
      <br>
      <label><span>username</span>
        <input type="text" name="username" :value="username" @input="update">
      </label>
      <label><span>password</span>
        <input type="password" name="password" :value="password">
      </label>
    <div class="text-center">
      <button type="button" class="button" @click="login">Logueate {{username}}</button>
    </div>
  </div>
`,
  data: function(){
    return {
      username: null,
      password: null,
    };
  },
  methods: {
    update: function(e){
      this.username = e.target.value;
    },
    login: function(){
      let user = {
        username: this.username,
        pasword: this.password
      };

      this.$emit("login", user);
    }
  }
});


/***/ }),
/* 3 */
/***/ (function(module, exports) {


Vue.component('user-detail', {
  template: `
  <div class="user-detail">
    <div class="text-center">
      <br>
      <h1><i class="fa fa-user-circle" aria-hidden="true"></i></h1>
      <h4>@{{user.username}}</h4>
    </div>
    <ul class="menu vertical">
      <li><a href="#" class="selected"><i class="fa fa-list-ul fa-fw" aria-hidden="true"></i> Mis listas</a></li>
      <li><a href="#"><i class="fa fa-history fa-fw" aria-hidden="true"></i> Historial</a></li>
      <li>
      <br>
        <button type="button" name="button" class="button alert float-center" @click="logout">
          <i class="fa fa-sign-out" aria-hidden="true"></i> Logout
        </button>
      </li>
    </ul>
  </div>`,
  props:['user'],
  methods: {
    logout: function(){
      this.$emit("logout");
    }
  }
});


/***/ }),
/* 4 */
/***/ (function(module, exports) {

let SessionService = function(){};

SessionService.prototype.hasSession = function(){
  return localStorage.getItem('y_username') !== null;
};

SessionService.prototype.saveSession = function(username, password){
  localStorage.setItem("y_username", username);
  localStorage.setItem("y_pass", password);
};

/**
* @return {User}
*/
SessionService.prototype.getSession = function(){
  return {
    username: localStorage.getItem("y_username"),
    password: localStorage.getItem("y_pass")
  };
};

SessionService.prototype.closeSession = function(){
  localStorage.clear();
};

module.exports = SessionService;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const AppComponent = __webpack_require__(0)
__webpack_require__(1)
__webpack_require__(3)
__webpack_require__(2)

let app = new AppComponent();
app.$mount('#app');

$(document).foundation();


/***/ })
/******/ ]);