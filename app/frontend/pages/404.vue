<template>
  <div>
    <app-title text="404エラー"></app-title>
    ページが見つかりません。
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: '404Page',
  head: {
    title: '404エラー',
  },
});
</script>
