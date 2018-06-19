<template>
    <Page class="page">
        <ActionBar title="Список тестов" class="action-bar"></ActionBar>
        <StackLayout>
            <StackLayout>
                <Label class="h1 text-center" :text="selectedTheme.description" textWrap="true"></Label>
            </StackLayout>
            <StackLayout class="hr-dark"></StackLayout>
            <StackLayout>
                <ListView for="test in tests" @itemTap="selectItem" class="list-group">
                    <v-template>
                        <Label :text="test.name" class="label list-group-item list-group-item-text"></Label>
                    </v-template>
                </ListView>
            </StackLayout>
        </StackLayout>
    </Page>
</template>

<script>
  import themeMixin from '../mixins/theme';
  import testMixin from '../mixins/test';

  export default {
    created() {
      this.loadTests();
    },
    mixins: [
      themeMixin,
      testMixin,
    ],
    methods: {
      selectItem({ item: selectedTest }) {
        this.selectTest(selectedTest);
        this.$router.push({ name: 'test' });
      },
    },
  };
</script>
