<template>
  <div>
    <app-title text="ダッシュボード"></app-title>
    <div>bbbb</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>ccc</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
    <div>aaa</div>
  </div>
</template>

<script lang="ts">
import AppTitle from '~/components/AppTitle.vue'

export default {
  name: 'IndexPage',
  components: {
    AppTitle,
  },
  async asyncData() {
    const test = await axios()
  },
  data() {
    return {
      test: '',
    }
  },
  head: {
    title: 'TOP',
  },
  mounted() {},
}
</script>
