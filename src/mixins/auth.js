import { createNamespacedHelpers } from 'vuex';

const { mapGetters, mapActions } = createNamespacedHelpers('auth');

export default {
  computed: {
    ...mapGetters([
      'checkAuth',
    ]),
  },
  methods: {
    ...mapActions([
      'login',
    ]),
  },
};
