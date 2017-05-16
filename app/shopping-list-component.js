const HTTP = require('./http.js');

let ShoppingListComponent = Vue.component('shoppinglist', {
  template: `
  <div class="off-canvas-content" data-off-canvas-content>
    <div class="row content">
      <div class="small-12 columns">
        <!-- Title -->
        <h4 class="title">
          <router-link to="/">
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
          </router-link>
          {{list.name}}
          <button href="#" class="button hollow float-right">Save <i class="fa fa-floppy-o" aria-hidden="true"></i></button>
        </h4>
      </div>
      <!-- Search -->
      <div class="search">
        <!-- Search Box-->
        <div class="small-12">
          <div class="small-11 float-right columns">
            <input type="search" v-model="query" @input="findProducts" placeholder="Search products...">
          </div>
          <div class="small-1 float-right">
            <i class="fa fa-search float-right" aria-hidden="true" style="font-size:1.4rem; margin-top: 4px;"></i>
          </div>
        </div>
        <!-- Results -->
        <div v-if="results.length > 0 && query != ''" class="small-12" style="position: absolute; top: 6rem;">
          <div class="small-11 float-right columns ">
            <div class="card">
              <div class="card-section">
                <result v-for="product in results" :product="product" :results="results" v-on:add="addListItem"></result>
              </div>
            </div>
          </div>
        </div>
      </div>
      <list-item v-for="item in list.items" :item="item"></list-item>
    </div>
  </div>`,
  data: function(){
    return {
      list: this.$parent.state.shoppinglist,
      user: this.$parent.state.user,
      query: '',
      results: []
    };
  },
  methods: {
    findProducts: function(){
      HTTP.get('product?criteria=' + this.query + '&size=5')
          .then(response => {
            this.results = response.data;
          })
          .catch(error => {
            console.log("ERROR");
            this.error = error.response.data;
          });
    },
    addListItem: function(product){
      let item = {
        quantity: 1,
        product: product
      };

      HTTP.post('shoppingList/add-item/' + this.list.id, item)
          .then(response => {
            this.list.items.push(item);
            this.results = [];
            this.query = '';
          })
          .catch(error => {
            this.error = error.response.data;
          });
    }
  }
});

module.exports = ShoppingListComponent;
