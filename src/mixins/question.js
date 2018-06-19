import { createNamespacedHelpers } from 'vuex';

const { mapGetters, mapActions } = createNamespacedHelpers('question');

export default {
  computed: {
    ...mapGetters([
      'questions',
      'answeredQuestions',
      'currentQuestion',
      'result',
      'hasCurrentQuestion',
      'correctAnswersForCurrentQuestion',
    ]),
  },
  methods: {
    ...mapActions([
      'loadQuestions',
      'answerToQuestion',
    ]),
  },
};
