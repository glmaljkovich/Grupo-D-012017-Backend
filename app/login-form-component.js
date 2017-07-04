const User = require('./user.js');

Vue.component('login-form', {
  template: `
  <div class="small-12 columns">
      <br>
      <div class="text-center subheader" style="margin-top: 10vh;">
        <h1>{{$t("message.hello")}}</h1>
        <p class="lead"><i>{{$t("message.trylogin")}}</i></p>
      </div>
      <!-- Login -->
      <div class="small-12 columns text-center">
          <br>
          <button type="button" class="button large hollow" @click="login">Login</button>
      </div>
  </div>
`,
  methods: {
    login: function(){
      this.$emit("login");
    }
  }
});
