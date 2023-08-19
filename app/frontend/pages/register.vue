<template>
  <v-card id="section">
    <div id="register-icon">
      <RegisterIcon />
    </div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(registerUser)">
        <h2 class="font-weight-bold text-center mb-3">ユーザー登録</h2>
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
          <p v-if="errors[0]" class="text-danger my-1 error-message">
            {{ errors[0] }}
          </p>
        </ValidationProvider>
        <label for="email" class="font-weight-bold mt-3">メールアドレス</label>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|email"
          :bails="false"
          mode="lazy"
        >
          <b-form-input
            id="email"
            v-model="email"
            type="text"
            class="w-100"
            placeholder="メールアドレスを入力"
            size="lg"
          ></b-form-input>
          <div v-if="errors">
            <p
              v-for="(error, index) in errors"
              :key="index"
              class="text-danger my-1 error-message"
            >
              {{ error }}
            </p>
          </div>
        </ValidationProvider>
        <label for="password" class="font-weight-bold mt-3">パスワード</label>
        <ValidationProvider
          v-slot="{ errors }"
          name="password"
          rules="required"
        >
          <b-form-input
            id="password"
            v-model="password"
            type="password"
            class="w-100"
            placeholder="パスワードを入力"
            size="lg"
          ></b-form-input>
          <p v-if="errors[0]" class="text-danger my-1 error-message">
            {{ errors[0] }}
          </p>
        </ValidationProvider>
        <label for="password-comfirm" class="font-weight-bold mt-3"
          >パスワード再入力</label
        >
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|password:@password"
          name="confirm"
          mode="lazy"
        >
          <b-form-input
            id="password-comfirm"
            v-model="passwordComfirm"
            type="password"
            class="w-100"
            placeholder="パスワード再入力"
            size="lg"
          ></b-form-input>
          <div v-if="errors">
            <p
              v-for="(error, index) in errors"
              :key="index"
              class="text-danger my-1 error-message"
            >
              {{ error }}
            </p>
          </div>
        </ValidationProvider>
        <div class="w-100 text-center">
          <b-button
            type="submit"
            pill
            variant="info"
            class="mt-8 px-12 py-4 font-weight-bold text-white text-center mx-auto"
            >登録する</b-button
          >
        </div>
      </b-form>
    </ValidationObserver>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { extend } from 'vee-validate';
import RegisterIcon from '~/components/RegisterIcon.vue';

extend('required', {
  validate(value) {
    return {
      required: true,
      valid: !['', null, undefined].includes(value),
    };
  },
  message: '必須入力です。',
});

extend('email', {
  validate(value) {
    return {
      valid: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value),
    };
  },
  message: '正しいメールアドレスの形式で入力してください。',
});

extend('password', {
  params: ['target'],
  validate(value, { target }: any) {
    return value === target;
  },
  message: 'パスワードが一致しません。',
});

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
  methods: {
    registerUser() {
      alert('登録');
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
#register-icon {
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.error-message {
  font-size: 14px;
}
</style>
