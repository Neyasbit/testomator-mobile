import { createNamespacedHelpers } from 'vuex';

const { mapGetters, mapActions } = createNamespacedHelpers('theme');

export default {
  computed: {
    ...mapGetters([
      'themes',
      'selectedTheme',
    ]),
  },
  methods: {
    ...mapActions([
      'loadThemes',
      'selectTheme',
    ]),
  },
};
