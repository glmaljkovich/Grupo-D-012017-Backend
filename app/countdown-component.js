
Vue.component('countdown', {
  template: `
  <div class="bottom-sheet small-12 columns">
    <div class="card-section flex">
      <div class="small-6 medium-4 columns">
        <p class="title">Caja {{register.id}}</p>
        <h5 v-if="waiting" id="time"><i class="fa fa-clock-o" aria-hidden="true"></i> Espera: {{register.waitingTime}}</h5>
        <p v-else><i class="fa fa-check-circle" aria-hidden="true"></i> Ya puedes pasar por la caja</p>
      </div>
      <div class="small-6 medium-4 columns">
        &nbsp;
      </div>
    </div>
  </div>`,
  props:['register'],
  data: function(){
    return {
      waiting: true
    };
  },
  mounted: function(){
    this.countDown();
  },
  methods: {
    countDown: function(){
      let that = this;
      let date = new Date();
      date.setSeconds(date.getSeconds() + this.register.waitingTime);
      $('h5#time').countdown(date)
                  .on('update.countdown', function(event){
                      that.register.waitingTime = event.strftime('%M min %S seg');
                  })
                  .on('finish.countdown', function(){
                    that.waiting = false;
                    that.$emit("register-ready");
                  });
    }
  }
});
