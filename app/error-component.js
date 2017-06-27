Vue.component('error', {
  template: `
  <transition name="fade">
    <div v-if="error" class="alert callout" data-closable="slide-out-right" style="position: absolute; top: 10vh; right: 1rem; z-index: 1;">
      <button class="close-button small" aria-label="Dismiss alert" type="button" @click="messageRead">
        <span aria-hidden="true">&times;</span>
      </button>
      <p style="margin-right: 2rem;"><b>Success:</b> {{error}}</p>
    </div>
  </transition>`,
  computed: {
    error: function(){
      return this.$store.state.error;
    }
  },
  mounted: function(){
    $('.alert').foundation();
  },
  methods: {
    messageRead: function(){
      this.$store.commit("setError", null);
    }
  }
});
