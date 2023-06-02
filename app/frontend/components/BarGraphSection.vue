<template>
  <div class="mt-3">
    <v-card id="section">
      <v-container>
        <v-row>
          <v-col cols="8">
            <bar-graph></bar-graph>
          </v-col>
          <v-col cols="4">
            <date-picker></date-picker>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BarGraph from '~/components/BarGraph.vue';
import DatePicker from '~/components/DatePicker.vue';

export default Vue.extend({
  name: 'BarGraphSection',
  components: {
    BarGraph,
    DatePicker,
  },
});
</script>

<style scoped>
#section {
  padding: 10px;
}
</style>
