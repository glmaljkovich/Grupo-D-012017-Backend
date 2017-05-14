const User = require('./user.js');

Vue.component('login-form', {
  template: `
  <div class="small-12 columns">
      <br>
      <label><span>username</span>
        <input type="text" name="username" v-model="username">
      </label>
      <label><span>password</span>
        <input type="password" name="password" v-model="password">
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
      let login = {
        username: this.username,
        password: this.password
      };

      this.$emit("login", login);
    }
  }
});
