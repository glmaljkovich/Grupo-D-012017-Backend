
let ListItemComponent = Vue.component('list-item', {
  template: `
  <div class="small-12 large-6 end columns">
    <div class="card list">
      <div class="card-section" style="position: relative;">
        <div class="small-3 columns">
          <img src="http://lorempixel.com/200/200/food" class="img-rounded" alt="">
        </div>
        <div class="small-9  columns">
          <div class="small-12 columns">
            <h5>{{item.product.name}}</h5>
          </div>
          <div class="small-6 large-4 xlarge-3 end columns">
            <p class="subheader">UNIDAD</p>
            <p>$ {{item.product.price.integer}}.{{item.product.price.decimal}}</p>
          </div>
          <div class="small-6 large-4 xlarge-3 end columns">
            <p class="subheader">CANTIDAD</p>
            <input type="number" v-model="item.quantity">
          </div>
        </div>
        <button @click="deleteme" class="button alert hidden-button" type="button" style="position: absolute; top: 0;">
          <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>`,
  props: ['item'],
  methods: {
    deleteme: function(){
      this.$emit('deleteme', this.item);
    }
  }
});

module.exports = ListItemComponent;
