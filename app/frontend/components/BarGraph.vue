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
      <period-button @toggleTerm="toggle" />
    </no-ssr>
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
          categories: [] as Array<string>,
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
  async mounted() {
    await this.$store.dispatch('spending/load_bar_graph_date');
    await this.$store.dispatch('spending/load_bar_graph_week');
    await this.$store.dispatch('spending/load_bar_graph_month');
    const labels = await this.$store.getters[
      'spending/get_bar_graph_date_labels'
    ];
    const series: Array<number> = await this.$store.getters[
      'spending/get_bar_graph_date_series'
    ];
    this.chartOptions.xaxis.categories.push(...labels);
    this.series = [{ name: '使用金額', data: series }];
  },
  methods: {
    toggle(term: string) {
      let labels: Array<string>;
      let series: Array<number>;
      switch (term) {
        case 'date': {
          labels = this.$store.getters['spending/get_bar_graph_date_labels'];
          series = this.$store.getters['spending/get_bar_graph_date_series'];
          break;
        }
        case 'week': {
          labels = this.$store.getters['spending/get_bar_graph_week_labels'];
          series = this.$store.getters['spending/get_bar_graph_week_series'];
          break;
        }
        default:
          labels = this.$store.getters['spending/get_bar_graph_month_labels'];
          series = this.$store.getters['spending/get_bar_graph_month_series'];
      }
      this.chartOptions = {
        ...this.chartOptions,
        xaxis: {
          ...this.chartOptions.xaxis,
          categories: labels,
        },
      };
      this.$set(this, 'series', [{ name: '使用金額', data: series }]);
    },
  },
});
</script>
