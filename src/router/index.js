import Vue from 'vue';
import Router from 'vue-router';
import Main from '../components/pages/Main';
import NotFound from '../components/pages/NotFound';
import Catalog from '../components/pages/Catalog';
import About from '../components/pages/About';
import Contacts from '../components/pages/Contacts';
import ObjectCard from '../components/pages/ObjectCard';
import Admin from '../components/pages/Admin';
import AddObject from '../components/pages/AddObject';
import AddUser from '../components/pages/AddUser';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', component: Main },
    { path: '/404', component: NotFound },
    { path: '/catalog', component: Catalog },
    { path: '/about', component: About },
    { path: '/contacts', component: Contacts },
    { path: '/admin', component: Admin },
    { path: '/admin/add-object', component: AddObject },
    { path: '/admin/add-user', component: AddUser },
    { path: '/object-card/:id', component: ObjectCard },
    { path: '*', redirect: '/404' }
  ]
});
