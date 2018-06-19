import { request } from 'tns-core-modules/http/http';
import config from '../../config';

export default {
  namespaced: true,
  state: {
    themes: [],
    selectedTheme: null,
  },
  mutations: {
    setThemes: (state, themes) => {
      state.themes = themes;
    },
    setSelectedTheme: (state, theme) => {
      state.selectedTheme = theme;
    },
  },
  getters: {
    themes: state => state.themes,
    selectedTheme: state => state.selectedTheme,
  },
  actions: {
    loadThemes: ({ commit, rootGetters }) => {
      return new Promise((resolve, reject) => {
        request({
          method: 'GET',
          url: `${config.host}/api/theme?api_token=${rootGetters['auth/token']}`,
          headers: {
            'Accept': 'application/json',
          },
        })
          .then((response) => {
            if (response.statusCode !== 200) {
              reject();
            } else {
              commit('setThemes', response.content.toJSON().data);
              resolve();
            }
          })
          .catch(reject);
      });
    },
    selectTheme: ({ commit }, theme) => {
      commit('setSelectedTheme', theme);
    },
  },
};
