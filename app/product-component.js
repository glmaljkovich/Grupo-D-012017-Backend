

let ListItemComponent = Vue.component('product', {
  template: `
  <div class="small-12 large-3 end columns">
    <div class="card" data-equalizer-watch>
      <img src="http://lorempixel.com/400/200/food">
      <div class="card-section">
        <h5>{{product.name}}</h5>
        <p>$ {{product.price.integer}}.{{product.price.decimal}}</p>
      </div>
    </div>
  </div>`,
  props: ['product'],
  mounted: function(){
    $('.recommended').foundation();
  },
  methods: {
    deleteme: function(){
      this.$emit('deleteme', this.item);
    }
  }
});

module.exports = ListItemComponent;
