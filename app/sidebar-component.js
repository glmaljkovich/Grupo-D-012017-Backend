
Vue.component('user-detail', {
  template: `
  <div class="user-detail">
    <div class="text-center">
      <br>
      <h1><i class="fa fa-user-circle" aria-hidden="true"></i></h1>
      <h4>@{{user.username}}</h4>
    </div>
    <ul class="menu vertical">
      <li>
        <router-link to="/admin">
          <i class="fa fa-tachometer fa-fw" aria-hidden="true"></i> {{$t("message.dashboard")}} </a>
        </router-link>
      </li>
      <li>
        <router-link to="/home" >
          <i class="fa fa-list-ul fa-fw" aria-hidden="true"></i> Mis listas <span class="alert badge">{{listSize}}</span>
        </router-link>
      </li>
      <li>
        <router-link to="/profile" >
          <i class="fa fa-user fa-fw" aria-hidden="true"></i> Perfil
        </router-link>
      </li>
      <li>
        <router-link to="/history">
          <i class="fa fa-history fa-fw" aria-hidden="true"></i> Historial </a>
        </router-link>
      </li>
      <li>
      <select v-model="lang">
        <option value="es" selected="selected">Español</option>
        <option value="en">English</option>
      </select>
      </li>
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
  },
  data: function(){
    return {
      lang: 'es'
    };
  },
  watch:{
    lang: function(){
      this.$i18n.locale = this.lang;
    }
  },
  computed: {
    listSize(){
      return this.$store.state.lists.length;
    }
  }
});
