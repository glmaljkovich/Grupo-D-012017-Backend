

let ListItemComponent = Vue.component('product', {
  template: `
  <div class="small-12 large-3 end columns">
    <div class="card" data-equalizer-watch>
      <img style="height: 200px;" src="http://lorempixel.com/400/200/food">
      <div class="card-section">
        <h5>{{product.name}}</h5>
        <p>$ {{product.price.integer}}.{{product.price.decimal}}</p>
        <button @click="addme" type="button" class="button"><i class="fa fa-plus fa-lg" aria-hidden="true"></i> ADD</button>
      </div>
    </div>
  </div>`,
  props: ['product'],
  mounted: function(){
    $('.recommended').foundation();
  },
  methods: {
    deleteme: function(){
      this.$emit('deleteme', this.product);
    },
    addme: function(){
      this.$emit('addme', this.product);
    }
  }
});

module.exports = ListItemComponent;
