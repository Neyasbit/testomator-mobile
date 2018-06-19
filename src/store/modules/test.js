import { request } from 'tns-core-modules/http/http';
import config from '../../config';

export default {
  namespaced: true,
  state: {
    tests: [],
    selectedTest: null,
  },
  getters: {
    tests: state => state.tests,
    selectedTest: state => state.selectedTest,
  },
  mutations: {
    setTests: (state, tests) => {
      state.tests = tests;
    },
    setSelectedTest: (state, test) => {
      state.selectedTest = test;
    },
  },
  actions: {
    loadTests: ({ commit, rootGetters }) => new Promise((resolve, reject) => {
      request({
        url: `${config.host}/api/theme/${rootGetters['theme/selectedTheme'].id}/tests?api_token=${rootGetters['auth/token']}`,
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })
        .then((response) => {
          if (response.statusCode !== 200) {
            reject();
          } else {
            commit('setTests', response.content.toJSON().data);
            resolve();
          }
        })
        .catch(reject);
    }),
    selectTest: ({ commit }, test) => {
      commit('setSelectedTest', test);
    },
  },
};
