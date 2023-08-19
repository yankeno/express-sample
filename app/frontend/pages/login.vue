<template>
  <v-card id="section">
    <div id="login-icon">
      <login-icon />
    </div>
    <b-form @submit.prevent="userLogin">
      <h2 class="font-weight-bold text-center mb-4">ログイン</h2>
      <label for="email" class="font-weight-bold mt-5">メールアドレス</label>
      <b-form-input
        id="email"
        v-model="email"
        type="text"
        class="w-100"
        placeholder="メールアドレスを入力"
        size="lg"
      ></b-form-input>
      <label for="password" class="font-weight-bold mt-5">パスワード</label>
      <b-form-input
        id="password"
        v-model="password"
        type="password"
        class="w-100"
        placeholder="パスワードを入力"
        size="lg"
      ></b-form-input>
      <p v-if="loginFailed" class="pt-2 text-danger position-absolute">
        ユーザー名またはパスワードが間違っています
      </p>
      <div class="w-100 text-center">
        <b-button
          type="submit"
          pill
          variant="info"
          class="mt-16 px-12 py-4 font-weight-bold text-white text-center mx-auto"
          >ログイン</b-button
        >
      </div>
      <div class="text-center mt-3">
        <nav><nuxt-link to="/register">新規登録</nuxt-link></nav>
      </div>
    </b-form>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import LoginIcon from '~/components/LoginIcon.vue';

export default Vue.extend({
  name: 'LoginPage',
  components: {
    LoginIcon,
  },
  middleware: 'redirect-if-authenticated',
  data() {
    return {
      email: '',
      password: '',
      loginFailed: false,
    };
  },
  head: {
    title: 'ログイン',
  },
  methods: {
    async userLogin() {
      try {
        await this.$auth.loginWith('local', {
          data: { email: this.email, password: this.password },
        });
      } catch (error) {
        this.loginFailed = true;
        console.log('Failed to login', error);
      }
    },
  },
});
</script>

<style scoped>
#section {
  width: 500px;
  padding: 50px 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#login-icon {
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
