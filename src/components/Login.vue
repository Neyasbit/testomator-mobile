<template>
    <Page class="page">
        <StackLayout class="form">
            <StackLayout class="input-field">
                <TextField class="input" hint="Email" eyboardType="email" autocorrect="false"
                           autocapitalizationType="none" v-model="credentials.email"></TextField>
            </StackLayout>

            <StackLayout class="input-field">
                <TextField class="input" hint="Пароль" secure="true" v-model="credentials.password"></TextField>
            </StackLayout>

            <Button text="Войти" class="btn btn-primary btn-outline" @tap="submit"></Button>
        </StackLayout>
    </Page>
</template>

<script>
  import authMixin from '../mixins/auth';

  export default {
    data() {
      return {
        credentials: {
          email: 'admin@mail.com',
          password: 'password',
        },
      };
    },
    mixins: [
      authMixin,
    ],
    methods: {
      submit() {
        if (!this.credentials.email || !this.credentials.password) {
          alert({
            title: 'Ошибка!',
            message: 'Все поля должны быть заполнены',
            okButtonText: 'Закрыть',
          });
        } else {
          this.login(this.credentials)
            .then(() => {
              this.$router.push({ name: 'themes' });
            })
            .catch(() => {
              alert({
                title: 'Ошибка!',
                message: 'Проверьте, пожалуйста, введенные данные',
                okButtonText: 'Закрыть',
              });
            });
        }
      },
    },
  };
</script>

<style scoped>
    .page {
        align-items: center;
        flex-direction: column;
    }

    .form {
        margin-left: 30px;
        margin-right: 30px;
        flex-grow: 2;
        vertical-align: middle;
    }
</style>
