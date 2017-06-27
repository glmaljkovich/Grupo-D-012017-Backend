Vue.component('success', {
  template: `
  <transition name="fade">
    <div v-if="message" class="success callout" data-closable="slide-out-right" style="position: absolute; top: 10vh; right: 1rem; z-index: 1;">
      <button class="close-button small" aria-label="Dismiss alert" type="button" @click="messageRead">
        <span aria-hidden="true">&times;</span>
      </button>
      <p style="margin-right: 2rem;"><b>Success:</b> {{message}}</p>
    </div>
  </transition>`,
  computed: {
    message: function(){
      return this.$store.state.message;
    }
  },
  mounted: function(){
    $('.success').foundation();
  },
  methods: {
    messageRead: function(){
      this.$store.commit("setMessage", null);
    }
  }
});
