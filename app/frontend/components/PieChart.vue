<template>
  <div>
    <no-ssr placeholder="Loading...">
      <!-- labelsの設定よりレンダリングが先行するためv-ifで遅延させる -->
      <ApexChart
        v-if="series.length"
        :options="chartOptions"
        :series="series"
        width="40%"
      ></ApexChart>
    </no-ssr>
    <date-picker />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import DatePicker from './DatePicker.vue';

export default Vue.extend({
  name: 'PieChart',
  components: {
    DatePicker,
  },
  data() {
    return {
      series: [] as Array<number>,
      chartOptions: {
        chart: {
          type: 'pie',
        },
        labels: [] as Array<string>,
        title: {
          text: 'カテゴリ別支出',
          offsetY: 0,
          align: 'center',
        },
      },
    };
  },
  async mounted() {
    await this.$store.dispatch('spending/load_pie_chart');
    this.chartOptions.labels =
      this.$store.getters['spending/get_pie_chart_labels'];
    this.series = this.$store.getters['spending/get_pie_chart_series'];
  },
});
</script>
