// const HTTP = require('./http.js');
// import VueGoogleAutocomplete from 'vue-google-autocomplete';
//
// let ProfileComponent = Vue.component('profile', {
//   template: `
//   <div class="off-canvas-content" data-off-canvas-content>
//     <div class="row content">
//       <div class="small-12 columns">
//         <!-- Title -->
//         <h4 class="title">
//           <router-link to="/">
//             <i class="fa fa-chevron-left" aria-hidden="true"></i>
//           </router-link>
//           Profile
//         </h4>
//       </div>
//
//       <div class="small-12 columns">
//         <div class="card">
//           <div class="card-section">
//             <p class="subheader uppercase">Personal Information</p>
//             <br>
//             <label for="name">
//               Name
//               <input type="text" name="name" id="name" />
//             </label>
//             <label for="lastname">
//               Last name
//               <input type="text" name="name" id="lastname" /><br/>
//             </label>
//             <label for="address">
//               <vue-google-autocomplete
//                   id="address"
//                   classname="form-control"
//                   placeholder="Start typing"
//                   country="ar"
//                   v-on:placechanged="getAddressData">
//               </vue-google-autocomplete>
//             </label>
//             <button href="#" class="button hollow" @click="updateProfile">Save <i class="fa fa-floppy-o" aria-hidden="true"></i></button>
//           </div>
//         </div>
//
//       </div>
//     </div>
//   </div>`,
//   data: function(){
//     return {
//       profile: null
//     };
//   },
//   computed: {
//     user: function(){
//       return this.$store.state.user;
//     }
//   },
//   created: function(){
//     HTTP.get("user/profile/" + this.user.username)
//         .then(response => {
//           this.profile = response.data;
//         })
//         .catch(error => {
//           this.$store.commmit("setError", error.response.data);
//         });
//   },
//   methods: {
//     updateProfile: function(){
//       HTTP.put("user/profile")
//           .then(response => {
//             this.$store.commmit("setMessage", response.data);
//           })
//           .catch(error => {
//             this.$store.commmit("setError", error.response.data);
//           });
//     },
//     getAddressData: function(data, place){
//       console.log(data);
//     }
//   }
// });
//
// module.exports = ProfileComponent;
