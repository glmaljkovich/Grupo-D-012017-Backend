
Vue.component('card', {
  template: `
  <div class="small-12 medium-4 columns  end">
    <div class="card card-section shoppinglist" @click="open" style="position: relative;">
      <div class="float-left icon">
        <span class="fa-stack fa-lg">
          <i class="fa fa-circle fa-stack-2x"></i>
          <i class="fa fa-shopping-cart fa-stack-1x fa-inverse"></i>
        </span>
      </div>
      <div>
        <h5>{{shoppinglist.name}}</h5>
        <p>{{shoppinglist.items.length}} products</p>
      </div>
      <button @click="deleteme" class="button alert hidden-button" type="button" style="position: absolute; top: 0;">
        <i class="fa fa-trash" aria-hidden="true"></i>
      </button>
    </div>
  </div>`,
  props:['shoppinglist'],
  methods: {
    open: function(){
      this.$emit('open', this.shoppinglist);
      this.$router.push('/home/shoppinglist/' + this.shoppinglist.name);
    },
    deleteme: function(){
      this.$emit('deleteme', this.shoppingList);
    }
  }
});
