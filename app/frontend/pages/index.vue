<template>
  <div>
    <app-title text="ダッシュボード"></app-title>
    <pie-chart-section />
    <bar-graph-section />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AppTitle from '~/components/AppTitle.vue';
import PieChartSection from '~/components/PieChartSection.vue';
import BarGraphSection from '~/components/BarGraphSection.vue';

export default Vue.extend({
  name: 'IndexPage',
  components: {
    AppTitle,
    PieChartSection,
    BarGraphSection,
  },
  middleware: ['auth'],
  head: {
    title: 'TOP',
  },
});
</script>
