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
    <div v-if="register == null" class="bottom-sheet small-12">
      <div class="card-section">
        <div class="small-6 medium-4 columns">
          <p class="title">TOTAL</p>
          <p class="stat">$ {{total}}</p>
        </div>
        <div class="small-6 medium-4 columns">
          <button class="button alert" @click="checkout">CHECKOUT</button>
        </div>
      </div>
    </div>
    <div v-if="register" class="bottom-sheet small-12">
      <div class="card-section">
        <div class="small-6 medium-4 columns">
          <p class="title">Caja {{register.id}}</p>
          <p class="stat" id="time">Espera: {{register.waitingTime}} seg</p>
        </div>
        <div class="small-6 medium-4 columns">

        </div>
      </div>
    </div>
  </div>`,
  data: function(){
    return {
      list: this.$parent.state.shoppinglist,
      user: this.$parent.state.user,
      query: '',
      results: [],
      register: null,
      waiting: false
    };
  },
  computed: {
    total: function(){
      return this.list.items.reduce(function(parcial, item){
        return parcial + item.product.price.integer + (item.product.price.decimal/100);
      }, 0);
    }
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
            this.countDown();
          })
          .catch(error => {
            this.error = error.response.data;
          });
    },
    countDown: function(){
      let date = new Date();
      date.setSeconds(date.getSeconds() + this.register.waitingTime);
      var timerId = countdown(date,
        function(ts) {
          document.getElementById('time').innerHTML = ts.toHTML("strong");
        },
        countdown.HOURS|countdown.MINUTES|countdown.SECONDS);

    }
  }
});

module.exports = ShoppingListComponent;
