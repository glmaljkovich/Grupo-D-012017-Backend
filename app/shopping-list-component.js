
let ShoppingListComponent = Vue.component('shoppinglist', {
  template: `
  <div class="off-canvas-content" data-off-canvas-content>
    <div class="row content">
      <div class="small-12 columns">
        <h4 class="title"> <router-link to="/"><i class="fa fa-chevron-left" aria-hidden="true"></i></router-link> {{list.name}}</h4>
      </div>
      <list-item v-for="item in list.items" :item="item"></list-item>
    </div>
  </div>`,
  data: function(){
    return {
      list: this.$parent.state.shoppinglist
    };
  },
  methods: {
    open: function(){

    }
  }
});

module.exports = ShoppingListComponent;
