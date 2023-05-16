<template>
  <div>
    <app-title app-title="ダッシュボード"></app-title>
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
  asyncData() {
    // const spendings =
    return {
      // console.log('asyncData')
      test: 'test',
    }
  },
  data() {
    return {
      test: '',
    }
  },
  head: {
    title: 'TOP',
  },
  mounted() {
    console.log(this.test)
  },
}
</script>
