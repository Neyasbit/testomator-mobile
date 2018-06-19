<template>
    <Page class="page">
        <StackLayout>
            <ScrollView>
                <StackLayout v-if="hasCurrentQuestion">
                    <StackLayout>
                        <Label class="h1 text-center" :text="currentQuestion.text_content" textWrap="true"></Label>
                    </StackLayout>
                    <StackLayout class="hr-dark"></StackLayout>
                    <StackLayout>
                        <Button v-for="answer in currentQuestion.form_answers" class="btn"
                                :class="{
                                    'btn-primary': isAnswerSelected(answer)
                                }"
                                :text="answer.text_content"
                                @tap="handleSelectAnswer(answer)" textWrap="true"></Button>
                    </StackLayout>
                    <StackLayout>
                        <Button text="Ответить" @tap="handleSaveAnswers"
                                class="btn btn-primary btn-rounded-lg"></Button>
                    </StackLayout>
                </StackLayout>
            </ScrollView>

            <StackLayout v-if="showResults">
                <StackLayout>
                    <Label class="h3 text-center" textWrap="true" :text="`Всего вопросов: ${result.total}`"></Label>
                    <Label class="h3 text-center" textWrap="true"
                           :text="`Правильно отвеченно: ${result.correct}`"></Label>
                </StackLayout>
            </StackLayout>
        </StackLayout>
    </Page>
</template>

<script>
  import _ from 'lodash';
  import questionMixin from '../mixins/question';

  export default {
    created() {
      this.loadQuestions();
    },
    data() {
      return {
        selectedAnswers: [],
        showResults: false,
      };
    },
    mixins: [
      questionMixin,
    ],
    watch: {
      hasCurrentQuestion() {
        this.selectedAnswers = [];
        if (!this.hasCurrentQuestion) {
          this.showResults = true;
        }
      },
      currentQuestion() {
        this.selectedAnswers = [];
      }
    },
    methods: {
      handleSelectAnswer(answer) {
        if (this.isAnswerSelected(answer)) {
          this.selectedAnswers = _.reject(this.selectedAnswers, ['id', answer.id]);
        } else {
          this.selectedAnswers.push(answer);
        }
      },
      handleSaveAnswers() {
        this.answerToQuestion({
          question: this.currentQuestion,
          selectedAnswers: this.selectedAnswers,
        });
      },
      isAnswerSelected(answer) {
        return Boolean(_.find(this.selectedAnswers, ['id', answer.id]));
      },
    },
  };
</script>

<style scoped>

</style>
