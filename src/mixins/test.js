import { createNamespacedHelpers } from 'vuex';

const { mapGetters, mapActions } = createNamespacedHelpers('test');

export default {
  computed: {
    ...mapGetters([
      'tests',
      'selectedTest',
    ]),
  },
  methods: {
    ...mapActions([
      'loadTests',
      'selectTest',
    ]),
  },
};
