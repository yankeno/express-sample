<template>
  <div>
    <app-title text="ダッシュボード"></app-title>
    <pie-chart />
    <bar-graph />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AppTitle from '~/components/AppTitle.vue';
import PieChart from '~/components/PieChart.vue';
import BarGraph from '~/components/BarGraph.vue';

export default Vue.extend({
  name: 'IndexPage',
  components: {
    AppTitle,
    PieChart,
    BarGraph,
  },
  // data() {
  //   return {
  //     test: '',
  //   };
  // },
  head: {
    title: 'TOP',
  },
});
</script>
