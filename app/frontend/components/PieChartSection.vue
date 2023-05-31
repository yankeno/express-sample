<template>
  <div>
    <v-card id="section">
      <v-container>
        <v-row>
          <v-col cols="6">
            <pie-chart></pie-chart>
          </v-col>
          <v-col cols="6">
            <input-spending></input-spending>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import InputSpending from './InputSpending.vue';
import PieChart from '~/components/PieChart.vue';

export default Vue.extend({
  name: 'PieChartSection',
  components: {
    PieChart,
    InputSpending,
  },
});
</script>

<style scoped>
#section {
  padding: 10px;
}
</style>
