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
import Vue from 'vue';
import AppTitle from '~/components/AppTitle.vue';

export default Vue.extend({
  name: 'IndexPage',
  components: {
    AppTitle,
  },
  data() {
    return {
      test: '',
    };
  },
  head: {
    title: 'TOP',
  },
  mounted() {
    // console.log(this)
    this.$store.dispatch('spending/load_pie_chart');
    this.$store.dispatch('spending/load_bar_graph');
  },
});
</script>
