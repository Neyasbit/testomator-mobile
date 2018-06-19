import { request } from 'tns-core-modules/http/http';
import config from '../../config';

export default {
  namespaced: true,
  state: {
    user: null,
    token: null,
  },
  getters: {
    checkAuth: state => Boolean(state.user),
    user: state => state.user,
    token: state => state.token,
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user;
    },
    setToken: (state, token) => {
      state.token = token;
    }
  },
  actions: {
    login: ({ commit }, credentials) => new Promise((resolve, reject) => {
      request({
        method: 'POST',
        content: JSON.stringify(credentials),
        url: `${config.host}/api/auth/login`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
        .then((response) => {
          if (response.statusCode !== 200) {
            reject();
          } else {
            commit('setUser', response.content.toJSON().data);
            commit('setToken', response.content.toJSON().meta.api_token);
            resolve();
          }
        })
        .catch(() => {
          reject();
        });
    }),
  },
};
