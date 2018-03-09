import Vue from 'vue';
import Router from 'vue-router';
import Main from '../components/pages/Main';
import NotFound from '../components/pages/NotFound';
import Catalog from '../components/pages/Catalog';
import About from '../components/pages/About';
import Contacts from '../components/pages/Contacts';
import ObjectCard from '../components/pages/ObjectCard';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', component: Main },
    { path: '/404', component: NotFound },
    { path: '/catalog', component: Catalog },
    { path: '/about', component: About },
    { path: '/contacts', component: Contacts },
    { path: '/object-card/:id', component: ObjectCard },
    { path: '*', redirect: '/404' }
  ]
});
