<template>
  <div>
    <no-ssr placeholder="Loading...">
      <!-- labelsの設定よりレンダリングが先行するためv-ifで遅延させる -->
      <div v-if="series.length">
        <ApexChart
          :options="chartOptions"
          :series="series"
          width="90%"
        ></ApexChart>
      </div>
      <div v-else>今月の支出はありません</div>
    </no-ssr>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'PieChart',
  components: {},
  data() {
    return {
      series: [] as Array<number>,
      chartOptions: {
        chart: {
          type: 'pie',
        },
        labels: [] as Array<string>,
        title: {
          text: 'カテゴリ別支出（今月）',
          offsetY: 0,
          align: 'center',
        },
      },
    };
  },
  async mounted() {
    try {
      await this.$store.dispatch('spending/load_pie_chart');
      this.chartOptions.labels =
        this.$store.getters['spending/get_pie_chart_labels'];
      this.series = this.$store.getters['spending/get_pie_chart_series'];
    } catch (error: any) {
      console.error(error.message);
      this.$router.push('/404');
    }
  },
});
</script>
