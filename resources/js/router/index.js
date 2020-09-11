import Vue from 'vue'
import VueRouter from 'vue-router'
/* Layouts */
import Layout1 from '../layouts/Layout1'
import list_igd from '../views/igd/list'
import AuthLayout1 from '../layouts/AuthLayouts/AuthLayout1'
import SignIn1 from '../views/AuthPages/Default/SignIn1'
import notfound from '../views/Pages/ErrorPage'
import igdpasien_dashboard from '../views/igd/Patient'
import analytics from '../views/Dashboards/Analytics'

// store
import store from '../store'

Vue.use(VueRouter)
function guardMyroute(to, from, next) {
  // console.log(to);
  if (!(store.getters['auth/authenticated']) && to.path != '/auth/signin') {
    next({ "name": 'auth.signin' });
  }
  else if ((store.getters['auth/authenticated'])) {
    if ((((to.path == '/home' || to.path == '/' || to.path == '/auth/signin')))){// || !(to.name == store.getters['auth/user'].GroupUser + '.home')) {
      next({ "name": store.getters['auth/user'].GroupUser + '.home' ,"props":{ message:to.name.split('.')[1]+' Gak Bisa Akses jika Pasien Belum Pilih, Silahkan Pilih Pasien' } });
    }
    else {
      next();
    }
  }
  else {
    next();
  }
};
const igdchildRoutes = (prop) => [
  {
    path: '/',
    name: prop + '.home',
    component: list_igd,
    meta: {
      requiresauth: true,
      group: 'igd',
    },
    props:{

    },
    beforeEnter: guardMyroute,
  },
  {
    path: '/floor_stok',
    name: prop + '.floor_stok',
    component: list_igd,
    meta: {
      requiresauth: true,
      group: 'igd',
    },
    props:{

    },
    beforeEnter: guardMyroute,
  },
  {
    path: '/order_cssd',
    name: prop + '.order_cssd',
    component: list_igd,
    meta: {
      requiresauth: true,
      group: 'igd',
    },
    props:{

    },
    beforeEnter: guardMyroute,
  },
  {
    path: '/antrian_poli',
    name: prop + '.antrian_poli',
    component: list_igd,
    meta: {
      requiresauth: true,
      group: 'igd',
    },
    props:{

    },
    beforeEnter: guardMyroute,
  },
  {
    path: '/arsip_kunjungan',
    name: prop + '.arsip_kunjungan',
    component: list_igd,
    meta: {
      requiresauth: true,
      group: 'igd',
    },
    props:{

    },
    beforeEnter: guardMyroute,
  },
  {
    path: 'dashboard/:episode',
    name: prop + '.dashboard',
    component: igdpasien_dashboard,
    meta: {
      requiresauth: true,
      pasien: true,
      group: 'igd',
    },
    beforeEnter: guardMyroute,
  },
]
const authChildRoutes = (prop) => [
  {
    path: 'signin',
    name: prop + '.signin',
    component: SignIn1,
    beforeEnter: guardMyroute
  },
]
const anaChildRoutes = (prop) => [
  {
    path: '',
    name: prop + '.home',
    component: analytics,
    beforeEnter: guardMyroute
  },
]
const routes = [
  {
    path: '',
    name: 'home',
    meta: {
      requiresauth: true,
    },
    beforeEnter: guardMyroute,
  },
  {
    path: '/igd',

    component: Layout1,
    children: igdchildRoutes('igd')
  },
  {
    path: '/analytics',

    component: Layout1,
    children: anaChildRoutes('ana')
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthLayout1,
    children: authChildRoutes('auth')
  },
  {
    path: '*',
    name: 'notfound',
    component: notfound
  },
]
const router = new VueRouter({
  mode: 'history',
  routes
})
export default router
