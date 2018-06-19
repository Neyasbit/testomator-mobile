<template>
    <Page class="page">
        <ActionBar title="Список тем" class="action-bar"></ActionBar>
        <FlexboxLayout flexDirection="column">
            <ListView for="theme in themes" @itemTap="selectItem" class="list-group">
                <v-template>
                    <Label :text="theme.name" class="label list-group-item"></Label>
                </v-template>
            </ListView>
        </FlexboxLayout>
    </Page>
</template>

<script>
  import themeMixin from '../mixins/theme';

  export default {
    created() {
      this.loadThemes();
    },
    mixins: [
      themeMixin,
    ],
    methods: {
      selectItem(event) {
        this.selectTheme(event.item);
        this.$router.push({ name: 'tests-list' });
      },
    },
  };
</script>
