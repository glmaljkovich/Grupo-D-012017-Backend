const HTTP = require('./http.js');

// require('foundation-sites');


let HistoryComponent = Vue.component('history',{
  template:`
  <div class="off-canvas-content" data-off-canvas-content>
    <div class="row content">
      <div class="small-12 columns">
        <!-- Title -->
        <h4 class="title">
          <router-link to="/">
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
          </router-link>
          Historial
          <div v-if="page && page.totalPages > 0" class="float-right subheader" style="font-size: 1rem;">
            <a v-if="!page.first" class="float-left" @click="previousPage">
              <i class="fa fa-chevron-left" aria-hidden="true"></i>
            </a>
            <span class="float-left"> Pagina {{page.number + 1}} de {{page.totalPages}} </span>
            <a v-if="!page.last" class="float-left" @click="nextPage">
              <i class="fa fa-chevron-right" aria-hidden="true"></i>
            </a>
          </div>
        </h4>
      </div>

      <!-- Lists -->
      <div v-if="page && page.content.length > 0" class="small-12 columns">
        <ul class="accordion" data-allow-all-closed="true" id="history-lists" data-accordion>
          <history-item v-for="list in page.content" :list="list"></history-item>
        </ul>
      </div>

      <div v-else class="small-12 columns">
        <h4 class="subheader">No hay listas en su historial.</h4>
      </div>
    </div>

  </div>`,
  data: function(){
    return {
      page: null
    };
  },
  mounted: function(){
    $('.off-canvas-content').foundation();
  },
  created: function(){
    this.getPage(0);
  },
  methods: {
    getPage: function(number){
      HTTP.get('history/' + this.$store.state.user.username + '?size=3&page=' + number)
          .then(response => {
            this.page = response.data;
          })
          .catch(error => {
            this.$store.commit("setError", error.response.data);
          });
    },
    nextPage: function(){
      this.getPage(this.page.number + 1);
    },
    previousPage: function(){
      this.getPage(this.page.number - 1);
    }
  }
});

module.exports = HistoryComponent;
