<template>
  <div>
    <no-ssr placeholder="Loading...">
      <ApexChart
        v-if="series.length"
        :options="chartOptions"
        :series="series"
        type="bar"
        width="90%"
      ></ApexChart>
    </no-ssr>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BarGraph',
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
      },
    };
  },
  async created() {
    await this.$store.dispatch('spending/load_bar_graph');
    const labels = this.$store.getters['spending/get_bar_graph_labels'];
    const series: Array<number> =
      this.$store.getters['spending/get_bar_graph_series'];
    this.chartOptions.xaxis.categories = labels;
    this.series.push({
      name: '使用金額',
      data: series,
    });
  },
});
</script>
