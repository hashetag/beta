require('./bootstrap');

window.Vue = require('vue');
//window.swal = require('sweetalert');

Vue.component('groupe', require('./components/Groupe.vue').default);
Vue.component('type', require('./components/Type.vue').default);
Vue.component('city', require('./components/City.vue').default);
Vue.component('empresa', require('./components/Empresa.vue').default);
Vue.component('user', require('./components/User.vue').default);
Vue.component('category', require('./components/Category.vue').default);
Vue.component('product', require('./components/Product.vue').default);
Vue.component('cliente', require('./components/Cliente.vue').default);

Vue.component('search', require('./frontend/Search.vue'));

const app = new Vue({
  el: '#app',
  data :{
		menu : 0,
		page : 0
  }
});



