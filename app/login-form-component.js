const User = require('./user.js');

Vue.component('login-form', {
  template: `
  <div class="small-12 columns">
      <br>
      <div class="text-center subheader" style="margin-top: 10vh;">
        <h1>Welcome!</h1>
        <p class="lead"><i>Try logging in or registering to start using the app.</i></p>
        <error :error="error"></error>
      </div>
      <!-- Login -->
      <div class="small-12 columns text-center">
          <br>
          <button type="button" class="button large hollow" @click="login">Login</button>
      </div>
  </div>
`,
  props: ['error'],
  methods: {
    login: function(){
      this.$emit("login");
    }
  }
});
