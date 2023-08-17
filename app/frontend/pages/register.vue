<template>
  <v-card id="section">
    <div id="register-icon">
      <RegisterIcon />
    </div>
    <ValidationObserver v-slot="{ invalid }">
      <b-form>
        <h2 class="font-weight-bold text-center mb-4">ユーザー登録</h2>
        <label for="name" class="font-weight-bold mt-5">名前</label>
        <ValidationProvider v-slot="{ errors }" rules="required">
          <b-form-input
            id="name"
            v-model="name"
            v-validate="'required'"
            type="text"
            class="w-100"
            placeholder="ユーザー名を入力"
            size="lg"
          ></b-form-input>
          <span v-if="errors[0]" class="text-danger">名前は必須入力です。</span>
        </ValidationProvider>
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
        <label for="password-comfirm" class="font-weight-bold mt-5"
          >パスワード再入力</label
        >
        <b-form-input
          id="password-comfirm"
          v-model="passwordComfirm"
          type="password"
          class="w-100"
          placeholder="パスワード再入力"
          size="lg"
        ></b-form-input>
        <div class="w-100 text-center">
          <b-button
            type="submit"
            :disabled="invalid"
            pill
            variant="info"
            class="mt-14 px-12 py-4 font-weight-bold text-white text-center mx-auto"
            >登録する</b-button
          >
        </div>
      </b-form>
    </ValidationObserver>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import RegisterIcon from '~/components/RegisterIcon.vue';

export default Vue.extend({
  name: 'RegisterPage',
  components: { RegisterIcon },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordComfirm: '',
    };
  },
  head: {
    title: 'ユーザー登録',
  },
  methods: {},
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
#register-icon {
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
