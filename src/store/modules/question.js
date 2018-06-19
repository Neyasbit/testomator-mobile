import { request } from 'tns-core-modules/http/http';
import config from '../../config';
import _ from 'lodash';

export default {
  namespaced: true,
  state: {
    questions: [],
    answeredQuestions: [],
  },
  getters: {
    questions: state => state.questions,
    answeredQuestions: state => state.answeredQuestions,
    currentQuestion: (state) => {
      const answeredQuestionsIds = [];

      state.answeredQuestions.forEach((answerData) => {
        answeredQuestionsIds.push(answerData.question.id);
      });

      return _.reject(state.questions, function (question) {
        return answeredQuestionsIds.includes(question.id);
      })[0];
    },
    result: (state) => {
      return {
        total: state.questions.length,
        answered: state.answeredQuestions.length,
        correct: _.filter(state.answeredQuestions, ['isCorrect', true]).length,
      };
    },
    hasCurrentQuestion: (state, getters) => {
      return Boolean(getters.currentQuestion);
    },
    correctAnswersForCurrentQuestion: (state, getters) => {
      return _.filter(getters.currentQuestion.form_answers, ['is_correct_answer', true]);
    }
  },
  mutations: {
    setQuestions: (state, questions) => {
      state.questions = questions;
    },
    addToAnsweredQuestions: (state, answerData) => {
      state.answeredQuestions.push(answerData);
    },
    setAnsweredQuestions(state, questions) {
      state.answeredQuestions = questions;
    }
  },
  actions: {
    loadQuestions: ({ commit, rootGetters }) => new Promise((resolve, reject) => {
      let url = `${config.host}/api/test/${rootGetters['test/selectedTest'].id}/questions?api_token=${rootGetters['auth/token']}`;
      request({
        url: url,
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })
        .then((response) => {
          if (response.statusCode !== 200) {
            reject();
          } else {
            commit('setQuestions', response.content.toJSON().data);
            commit('setAnsweredQuestions', []);
            resolve();
          }
        })
        .catch(reject);
    }),
    answerToQuestion: ({ commit, getters }, { question, selectedAnswers }) => {
      let isCorrect = true;
      const correctAnswers = getters.correctAnswersForCurrentQuestion;

      if (selectedAnswers.length > correctAnswers.length || selectedAnswers.length < correctAnswers.length) {
        isCorrect = false;
      } else {
        selectedAnswers.forEach((answer) => {
          if (!Boolean(_.find(correctAnswers, ['id', answer.id]))) {
            isCorrect = false;
          }
        });
      }

      commit('addToAnsweredQuestions', {
        question,
        isCorrect,
      });
    },
  },
};
