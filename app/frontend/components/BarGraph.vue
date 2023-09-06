<template>
  <div>
    <period-button @toggleTerm="toggle" />
    <no-ssr placeholder="Loading...">
      <div v-if="graphSeries[0]?.data?.length">
        <ApexChart
          :options="graphOptions"
          :series="graphSeries"
          type="bar"
          height="350"
          width="90%"
        ></ApexChart>
      </div>
      <div v-else>期間内の支出はありません</div>
    </no-ssr>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import PeriodButton from './PeriodButton.vue';
import { BarGrapSeries } from '~/types/dashboard';

export default Vue.extend({
  name: 'BarGraph',
  components: {
    PeriodButton,
  },
  computed: {
    ...mapState('spending', {
      bar_graph_series: 'bar_graph_series',
      bar_graph_options: 'bar_graph_options',
    }),
    graphSeries(): Array<BarGrapSeries> {
      return JSON.parse(JSON.stringify(this.bar_graph_series));
    },
    graphOptions(): any {
      return JSON.parse(JSON.stringify(this.bar_graph_options));
    },
  },
  async mounted() {
    try {
      await this.$store.dispatch('spending/load_bar_graph_date');
      await this.$store.dispatch('spending/load_bar_graph_week');
      await this.$store.dispatch('spending/load_bar_graph_month');

      const labels = await this.$store.getters[
        'spending/get_bar_graph_date_labels'
      ];
      const series: Array<BarGrapSeries> = JSON.parse(
        JSON.stringify(
          await this.$store.getters['spending/get_bar_graph_date_series']
        )
      );
      const originalOptions = JSON.parse(
        JSON.stringify(this.bar_graph_options)
      );
      const chartOptions: any = {
        ...originalOptions,
        xaxis: {
          ...originalOptions.xaxis,
          categories: labels,
        },
      };

      const newChartOptions = JSON.parse(JSON.stringify(chartOptions));
      this.$store.commit('spending/set_bar_graph_options', newChartOptions);
      this.$store.commit('spending/set_bar_graph_series', series);
    } catch (error: any) {
      console.error(e.message);
      this.$router.push('/404');
    }
  },
  methods: {
    toggle(term: string) {
      let labels: Array<string>;
      let series: Array<BarGrapSeries>;
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
      this.$store.commit('spending/set_bar_graph_term', term);

      const originalOptions = JSON.parse(
        JSON.stringify(this.bar_graph_options)
      );
      const chartOptions: any = {
        ...originalOptions,
        xaxis: {
          ...originalOptions.xaxis,
          categories: labels,
        },
      };

      const newChartOptions = JSON.parse(JSON.stringify(chartOptions));
      this.$store.commit('spending/set_bar_graph_options', newChartOptions);
      this.$store.commit('spending/set_bar_graph_series', series);
    },
  },
});
</script>
