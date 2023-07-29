<template>
  <v-card id="section">
    <div id="login-icon">
      <login-icon />
    </div>
    <b-form @submit="login">
      <h2 class="font-weight-bold text-center mb-4">ログイン</h2>
      <label for="email" class="font-weight-bold mt-5">ユーザー名</label>
      <b-form-input
        v-bind="email"
        id="email"
        class="w-100"
        placeholder="ユーザー名を入力"
        size="lg"
      ></b-form-input>
      <label for="password" class="font-weight-bold mt-5">パスワード</label>
      <b-form-input
        v-bind="password"
        id="password"
        class="w-100"
        placeholder="パスワードを入力"
        size="lg"
      ></b-form-input>
      <div class="w-100 text-center">
        <b-button
          type="submit"
          pill
          variant="info"
          class="mt-16 px-12 py-4 font-weight-bold text-white text-center mx-auto"
          >ログイン</b-button
        >
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
  data() {
    return {
      email: '',
      password: '',
    };
  },
  head: {
    title: 'ログイン',
  },
  methods: {
    login() {
      console.log('submit');
    },
  },
});
</script>

<style scoped>
#section {
  width: 500px;
  padding: 50px 70px;
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
