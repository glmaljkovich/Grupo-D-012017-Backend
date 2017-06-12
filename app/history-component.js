const HTTP = require('./http.js');
var $ = window.$;
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
          <button href="#" class="button hollow float-right">Save <i class="fa fa-floppy-o" aria-hidden="true"></i></button>
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

      <transition name="fade">
        <div v-if="message" class="success callout" data-closable style="position: absolute; top: 10vh; right: 10vh; z-index: 1;">
          <button class="close-button" aria-label="Dismiss alert" type="button" @click="messageRead">
            <span aria-hidden="true">&times;</span>
          </button>
          <br>
          <p><b>Success:</b> {{message}}</p>
        </div>
      </transition>

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
      error: null,
      message: null,
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
    errorRead: function(){
      this.error = null;
    },
    messageRead: function(){
      this.message = null;
    },
    getPage: function(number){
      HTTP.get('history/' + this.$store.state.user.username + '?size=5&page=' + number)
          .then(response => {
            this.page = response.data;
            new Foundation.Accordion($('#history-lists'));
            $('#history-lists').html('caca');
          })
          .catch(error => {
            this.error = error.response.data;
          });
    }
  }
});

module.exports = HistoryComponent;
