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
      const barGraphDate = this.$store.state.spending.bar_graph_dates;
      console.log(barGraphDate);
      return barGraphDate ? barGraphDate.join(' ~ ') : '';
    },
  },
  watch: {
    dates(newDates: Array<string>) {
      if (newDates.length === 2) {
        const term = {
          from: newDates[0],
          to: newDates[1],
        };
        this.$store.dispatch('spending/load_bar_graph_date', term);
        this.$store.dispatch('spending/load_bar_graph_week', term);
        this.$store.dispatch('spending/load_bar_graph_month', term);
      }
    },
  },
});
</script>
