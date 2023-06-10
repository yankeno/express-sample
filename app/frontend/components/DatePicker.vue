<template>
  <div>
    <v-row dense>
      <v-col cols="9">
        <v-text-field
          v-model="dateRangeText"
          prepend-icon="mdi-calendar"
          readonly
          dense
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <v-date-picker
          v-model="dates"
          elevation="10"
          width="300"
          dense
          range
        ></v-date-picker>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'DatePicker',
  data() {
    return {
      dates: [
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substring(0, 10),
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substring(0, 10),
      ] as string[],
    };
  },
  computed: {
    dateRangeText(): string {
      const ds = this.dates;
      if (new Date(this.dates[0]) > new Date(this.dates[1])) {
        ds.reverse();
      }
      return ds.join(' ~ ');
    },
    ...mapState('spending', {
      bar_graph_series: 'bar_graph_series',
      bar_graph_options: 'bar_graph_options',
    }),
  },
  watch: {
    async dates(newDates: Array<string>) {
      if (newDates.length === 2) {
        const term = {
          from: newDates[0],
          to: newDates[1],
        };

        await this.$store.dispatch('spending/load_bar_graph_date', term);
        await this.$store.dispatch('spending/load_bar_graph_week', term);
        await this.$store.dispatch('spending/load_bar_graph_month', term);

        let labels: Array<string>;
        let series: Array<number>;

        switch (this.$store.getters['spending/get_bar_graph_term']) {
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

        const newSeries = [{ name: '使用金額', data: [...series] }];
        this.$store.commit('spending/set_bar_graph_series', newSeries);
      }
    },
  },
});
</script>
