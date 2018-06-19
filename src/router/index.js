import Vue from 'nativescript-vue';
import VueRouter from 'vue-router';
import Login from '../components/Login';
import store from '../store/index';
import Themes from '../components/Themes';
import TestsList from '../components/TestsList';
import Test from '../components/Test';

Vue.use(VueRouter);

const router = new VueRouter({
  pageRouting: true,
  routes: [
    {
      path: '/login',
      component: Login,
      name: 'login',
    },
    {
      path: '/themes',
      component: Themes,
      name: 'themes',
    },
    {
      path: '/theme/tests',
      component: TestsList,
      name: 'tests-list',
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (store.getters['auth/checkAuth']) {
    next();
  } else {
    if (to.name === 'login') {
      next();
    } else {
      next({ name: 'login' });
    }
  }
});

router.replace({ name: 'themes' });

module.exports = router;
