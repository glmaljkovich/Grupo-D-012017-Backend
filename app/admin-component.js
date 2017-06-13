const HTTP = require('./http.js');

let AdminComponent = Vue.component('shoppinglist', {
  template: `
  <div class="off-canvas-content" data-off-canvas-content>
    <div class="row content">
      <div class="small-12 columns">
        <!-- Title -->
        <h4 class="title">
          <router-link to="/">
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
          </router-link>
          Dashboard
        </h4>
      </div>
      <transition name="fade">
        <div v-if="error" class="alert callout" data-closable style="position: absolute; top: 10vh; right: 10vh; z-index: 1;">
          <button class="close-button" aria-label="Dismiss alert" type="button" @click="errorRead">
            <span aria-hidden="true">&times;</span>
          </button>
          <br>
          <p><b>Error:</b> {{error}}</p>

        </div>
      </transition>

      <success :message="message"></success>

      <div class="small-12 columns">
        <div class="card">
          <div class="card-section">
            <h4 class="subheader">Upload Products File</h4>
            <hr>
            <input type="file" name="file" id="filecito" /><br/><br/>
            <button class="button" @click="uploadFile"><i class="fa fa-upload" aria-hidden="true"></i> Subir</button>
          </div>
        </div>
      </div>
    </div>
  </div>`,
  data: function(){
    return {
      error: null,
      message: null
    };
  },
  computed: {
    user: function(){
      return this.$store.state.user;
    }
  },
  methods: {
    uploadFile: function(){
      var data = new FormData();
      data.append('file', document.getElementById('filecito').files[0]);

      HTTP.post('product/upload', data)
          .then(response => {
            this.message = response.data;
          })
          .catch(error => {
            this.error = error.response.data;
          });
    },
    errorRead: function(){
      this.error = null;
    },
    messageRead: function(){
      this.message = null;
    }
  }
});

module.exports = AdminComponent;
