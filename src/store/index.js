import Vue from 'nativescript-vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import theme from './modules/theme';
import test from './modules/test';
import question from './modules/question';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    auth,
    theme,
    test,
    question,
  },
  strict: debug,
});

Vue.prototype.$store = store;

module.exports = store;
