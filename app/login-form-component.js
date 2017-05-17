const User = require('./user.js');

Vue.component('login-form', {
  template: `
  <div class="small-12 columns">
      <br>
      <div class="text-center subheader">
        <h1>Welcome!</h1>
        <p class="lead"><i>Try logging in or registering to start using the app.</i></p>
        <transition name="fade">
          <div v-if="error" class="alert callout" data-closable>
            <p><b>Error:</b> {{error}}</p>
            <button class="close-button" aria-label="Dismiss alert" type="button" @click="errorRead">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </transition>
      </div>
      <div class="small-12 medium-2 columns">
        &nbsp;
      </div>
      <!-- Login -->
      <div class="small-12 medium-4 columns">
          <br>
          <h4>Login</h4>
          <label><span>username</span>
            <input type="text" name="username" v-model="username">
          </label>
          <label><span>password</span>
            <input type="password" name="password" v-model="password">
          </label>
        <div class="text-center">
          <button type="button" class="button hollow" @click="login">Login</button>
        </div>
      </div>
      <!-- Register -->
      <div class="small-12 medium-4 columns">
          <br>
          <h4>Register</h4>
          <label><span>username</span>
            <input type="text" name="username" v-model="nUsername">
          </label>
          <label><span>email</span>
            <input type="text" name="email" v-model="email">
          </label>
          <label><span>password</span>
            <input type="password" name="password" v-model="nPassword">
          </label>
        <div class="text-center">
          <button type="button" class="button success hollow" @click="register">Register </button>
        </div>
      </div>
      <div class="small-12 medium-2 columns">
        &nbsp;
      </div>
  </div>

`,
  data: function(){
    return {
      username: null,
      password: null,
      nUsername: null,
      nPassword: null,
      email: null
    };
  },
  props: ['error'],
  methods: {
    update: function(e){
      this.username = e.target.value;
    },
    login: function(){
      let login = {
        username: this.username,
        password: this.password
      };

      this.$emit("login", login);
    },
    register: function(){
      let register = {
        username: this.nUsername,
        password: this.nPassword,
        email: this.email
      };

      this.$emit("register", register);
    },
    errorRead: function(){
      this.$emit("error-read");
    }
  }
});
