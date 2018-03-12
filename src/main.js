import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import YmapPlugin from 'vue-yandex-maps';
import App from './App.vue';
import router from './router';

Vue.use(BootstrapVue);
Vue.use(YmapPlugin);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
