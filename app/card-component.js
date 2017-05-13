
Vue.component('card', {
  template: `
  <div class="small-12 medium-4 columns  end">
    <div class="shoppinglist">
      <div class="float-left icon">
        <span class="fa-stack fa-lg">
          <i class="fa fa-circle fa-stack-2x"></i>
          <i class="fa fa-shopping-cart fa-stack-1x fa-inverse"></i>
        </span>
      </div>
      <div>
        <h5>{{shoppinglist.name}}</h5>
        <p>{{shoppinglist.list.length}} products</p>
      </div>
    </div>
  </div>`,
  props:['shoppinglist'],
  methods: {

  }
});
