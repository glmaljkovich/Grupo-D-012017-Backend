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
          <button href="#" class="button hollow float-right" @click="saveList">Save <i class="fa fa-floppy-o" aria-hidden="true"></i></button>
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
    <error></error>
    <success></success>
    <div v-if="register == null" class="bottom-sheet small-12 columns">
      <div class="card-section flex">
        <div class="small-6 medium-4 columns">
          <p class="title">TOTAL</p>
          <p class="stat">$ {{total}}</p>
        </div>
        <div class="small-6 medium-4 columns">
          <button class="button small alert float-right" style="margin: 0 0 0.5rem;" @click="checkout"><i class="fa fa-shopping-cart" aria-hidden="true"></i> CHECKOUT</button>
          <span class="float-right">&nbsp;</span>
          <button class="button small float-right" style="margin: 0 0 0.5rem;"><i class="fa fa-truck" aria-hidden="true"></i> Envio a domicilio</button>
        </div>
      </div>
    </div>
    <countdown v-if="register" :register="register"></countdown>
  </div>`,
  data: function(){
    return {
      query: '',
      results: [],
      register: null,
      waiting: false
    };
  },
  computed: {
    total: function(){
      return this.list.items.reduce(function(parcial, item){
        return parcial + ((item.product.price.integer + (item.product.price.decimal/100)) * item.quantity);
      }, 0);
    },
    user: function(){
      return this.$store.state.user;
    },
    list: function(){
      return this.$store.state.shoppinglist;
    }
  },
  methods: {
    findProducts: function(){
      HTTP.get('product?criteria=' + this.query + '&size=5')
          .then(response => {
            this.results = response.data;
          })
          .catch(error => {
            this.$store.commmit("setError", error.response.data);
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
            this.$store.commmit("setError", error.response.data);
          });
    },
    checkout: function(){
      let request = {
        client: {
          username: this.user.username
        },
        shoppingList: this.list
      };

      HTTP.post('checkout', request)
          .then(response => {
            this.register = response.data;
            this.waiting = true;
          })
          .catch(error => {
            this.$store.commmit("setError", error.response.data);
          });
    },
    saveList: function(){
      let list2 = this.list;
      list2.user = {
        username: this.user.username
      };

      HTTP.post('shoppingList/update', list2)
          .then(response => {
            this.$store.commmit("setMessage", response.data);
          })
          .catch(error => {
            this.$store.commmit("setError", error.response.data);
          });
    }
  }
});

module.exports = ShoppingListComponent;
