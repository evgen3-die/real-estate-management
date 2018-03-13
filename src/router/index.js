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
import Login from '../components/pages/Login';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', component: Main },
    { path: '/404', component: NotFound },
    { path: '/catalog', component: Catalog },
    { path: '/about', component: About },
    { path: '/contacts', component: Contacts },
    { path: '/login', component: Login },
    { path: '/admin', component: Admin, meta: { requiresAuth: true } },
    { path: '/admin/add-object', component: AddObject, meta: { requiresAuth: true } },
    { path: '/admin/add-user', component: AddUser, meta: { requiresAuth: true } },
    { path: '/object-card/:id', component: ObjectCard },
    { path: '*', redirect: '/404' }
  ]
});
