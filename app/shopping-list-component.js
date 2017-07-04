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
          <button href="#" class="button hollow float-right" @click="saveList">{{$t("message.save")}} <i class="fa fa-floppy-o" aria-hidden="true"></i></button>
        </h4>
      </div>

      <!-- Search -->
      <div class="search">
        <!-- Search Box-->
        <div class="small-12">
          <div class="small-12 float-right columns" style="display: flex;">
          <i class="fa fa-search float-right" aria-hidden="true" style="font-size:1.4rem; margin: 4px 6px;"></i>
            <input style="width: auto; flex: 2;" type="search" v-model="query" @input="findProducts" placeholder="Search products...">
          </div>
        </div>
        <!-- Results -->
        <div v-if="results.length > 0 && query != ''" class="small-12" style="position: absolute; top: 6rem; z-index:1;">
          <div class="small-12 float-right columns ">
            <div class="card">
              <div class="card-section">
                <result v-for="product in results" :product="product" :results="results" v-on:add="addListItem"></result>
              </div>
            </div>
          </div>
        </div>
      </div>
      <list-item v-for="item in list.items" :item="item" v-on:deleteme="deleteItem"></list-item>
      <div v-if="products.length > 0" class="small-12 columns recommended" data-equalizer data-equalize-on="medium">
        <h5 class="subheader">
          {{$t("message.recommended")}}
        </h5>
        <hr style="margin-top: 0;">
        <product v-for="product in products" :product="product" v-on:addme="addme"></product>
      </div>
    </div>

    <div v-if="register == null" class="bottom-sheet small-12 columns">
      <div class="card-section flex">
        <div class="small-6 medium-4 columns">
          <p class="title">TOTAL</p>
          <p class="stat">$ {{total}}</p>
        </div>
        <div class="small-6 medium-4 columns">
          <button class="button small alert float-right" style="margin: 0 0 0.5rem;" @click="checkout"><i class="fa fa-shopping-cart" aria-hidden="true"></i> CHECKOUT</button>
          <span class="float-right">&nbsp;</span>
          <button class="button small float-right" style="margin: 0 0 0.5rem;"><i class="fa fa-truck" aria-hidden="true"></i> {{$t("message.delivery")}}</button>
        </div>
      </div>
    </div>
    <countdown v-if="register" :register="register" v-on:register-ready="registerReady"></countdown>
  </div>`,
  data: function(){
    return {
      query: '',
      results: [],
      register: null,
      waiting: false,
      products: []
    };
  },
  mounted: function(){
    this.getRecommendedProducts();
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
            this.$store.commit("setError", error.response.data);
          });
    },
    addme: function(product){
      this.addListItem(product);
      this.products = this.products.filter(elem => elem != product);
    },
    getRecommendedProducts: function(){
      HTTP.get('shoppingList/recommended/' + this.list.id)
          .then(response => {
            this.products = response.data;
          })
          .catch(error => {
            this.$store.commit("setError", error.response.data);
          });
    },
    registerReady: function(){
      this.$store.commit("setMessage", "Ya puedes pasar a la caja registradora.");
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
            this.getRecommendedProducts();
          })
          .catch(error => {
            this.$store.commit("setError", error.response.data);
          });
    },
    deleteItem: function(item){
      this.list.items = this.list.items.filter(elem => elem !== item);
      this.saveList();
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
            this.$store.commit("setError", error.response.data);
          });
    },
    saveList: function(){

      HTTP.post('shoppingList/update', this.list)
          .then(response => {
            this.$store.commit("setMessage", response.data);
          })
          .catch(error => {
            this.$store.commit("setError", error.response.data);
          });
    }
  }
});

module.exports = ShoppingListComponent;
