import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import YmapPlugin from 'vue-yandex-maps';
import App from './App.vue';
import router from './router';
import request from './helpers/request';

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    request.get('/check-login')
      .then(response => {
        if (!response.data) {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          });
        } else {
          next();
        }
      });

  } else {
    next();
  }
});

Vue.use(BootstrapVue);
Vue.use(YmapPlugin);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
