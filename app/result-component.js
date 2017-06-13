
let ResultComponent = Vue.component('result', {
  template: `
  <div class="product clearfix">
    <div class="small-3 medium-2 columns">
      <img src="http://lorempixel.com/200/200/food" class="img-rounded" alt="">
    </div>
    <div class="small-9 medium-10 columns">
      <div class="small-12 columns hide-for-small-only">
        <h4>&nbsp;</h4>
      </div>
      <div class="small-12 medium-4 columns">
        <h4>{{product.name}}</h4>
      </div>
      <div class="small-9 medium-4  columns">
        <p class="subheader">{{product.brand}}</p>
      </div>
      <div class="small-3 columns hide-for-medium">
        <h4 class="add-button" @click="add"><i class="fa fa-plus-circle fa-lg" aria-hidden="true"></i></h4>
      </div>
      <div class="small-12 medium-3  columns">
        <p class="">$ {{product.price.integer}}.{{product.price.decimal}}</p>
      </div>
      <div class="medium-1 columns hide-for-small-only">
        <h4 class="add-button" @click="add"><i class="fa fa-plus-circle fa-lg" aria-hidden="true"></i></h4>
      </div>
    </div>
    <hr v-if="results.length > 1">
  </div>`,
  props: ['product', 'results'],
  methods: {
    add: function(){
      this.$emit('add', this.product);
    }
  }
});

module.exports = ResultComponent;
