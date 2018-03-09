import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import router from './router';

Vue.use(BootstrapVue);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
