
Vue.component('history-item', {
  template: `
  <li class="accordion-item" data-accordion-item>
    <!-- Title -->
    <a href="#" class="accordion-title"><h5><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i> <i class="fa fa-shopping-cart fa-stack-1x fa-inverse"></i></span> {{list.name}}</h5></a>
    <!-- Content -->
    <div class="accordion-content" data-tab-content>
      <div v-for="item in list.items">
        {{item.product}}
        <span class="subheader float-right"> cantidad: {{item.quantity}}</span>
        <hr>
      </div>
    </div>
  </li>`,
  props:['list'],
  mounted: function(){
    $('.off-canvas-content').foundation();
  },
  methods: {

  }
});
