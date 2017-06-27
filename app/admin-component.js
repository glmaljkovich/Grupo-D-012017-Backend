const HTTP = require('./http.js');

let AdminComponent = Vue.component('admin', {
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

      <div class="small-12 columns">
        <div class="card">
          <div class="card-section">
            <p class="subheader uppercase">Upload Products File</p>
            <br>
            <input type="file" name="file" id="filecito" /><br/><br/>
            <button class="button" @click="uploadFile"><i class="fa fa-upload" aria-hidden="true"></i> Subir</button>
          </div>
        </div>

      </div>
    </div>
  </div>`,
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
            this.$store.commit("setMessage", response.data);
          })
          .catch(error => {
            this.$store.commmit("setError", error.response.data);
          });
    }
  }
});

module.exports = AdminComponent;
