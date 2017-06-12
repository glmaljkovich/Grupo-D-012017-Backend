
Vue.component('countdown', {
  template: `
  <div class="bottom-sheet small-12">
    <div class="card-section">
      <div class="small-6 medium-4 columns">
        <p class="title">Caja {{register.id}}</p>
        <h5 id="time"><i class="fa fa-clock-o" aria-hidden="true"></i> Espera: {{register.waitingTime}}</h5>
      </div>
      <div class="small-6 medium-4 columns">
        &nbsp;
      </div>
    </div>
  </div>`,
  props:['register'],
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
                  });
    }
  }
});
