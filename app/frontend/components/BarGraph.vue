<template>
  <div>
    <no-ssr placeholder="Loading...">
      <ApexChart
        v-if="series.length"
        :options="chartOptions"
        :series="series"
        type="bar"
        width="50%"
      ></ApexChart>
    </no-ssr>
    <period-button />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import PeriodButton from './PeriodButton.vue';

export default Vue.extend({
  name: 'BarGraph',
  components: {
    PeriodButton,
  },
  data() {
    return {
      series: [] as Array<Object>,
      chartOptions: {
        chart: {
          type: 'bar',
          height: 300,
        },
        plotOptions: {
          bar: {
            borderRadius: 3,
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: false,
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ['#304758'],
          },
        },
        tooltip: {
          enabled: true,
        },
        legend: {
          show: true,
          position: 'left',
        },
        xaxis: {
          type: 'category',
          categories: [],
          position: 'bottom',
        },
        yaxis: {
          labels: {
            show: true,
            formatter: (val: number) => {
              return val.toLocaleString() + '円';
            },
          },
        },
        title: {
          text: '期間別支出',
          offsetY: 0,
          align: 'center',
        },
      },
    };
  },
  async created() {
    await this.$store.dispatch('spending/load_bar_graph_date');
    const labels = this.$store.getters['spending/get_bar_graph_date_labels'];
    const series: Array<number> =
      this.$store.getters['spending/get_bar_graph_date_series'];
    this.chartOptions.xaxis.categories = labels;
    this.series.push({
      name: '使用金額',
      data: series,
    });
  },
});
</script>
