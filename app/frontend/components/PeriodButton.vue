<template>
  <v-card flat class="py-3">
    <v-card-text>
      <v-row align="center" justify="center">
        <v-btn-toggle
          v-model="term"
          color="primary"
          mandatory
          @change="toggleTerm"
        >
          <v-btn small value="date"> 日 </v-btn>
          <v-btn small value="week"> 週 </v-btn>
          <v-btn small value="month"> 月 </v-btn>
        </v-btn-toggle>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'PeriodButton',
  data() {
    return {
      term: undefined,
    };
  },
  methods: {
    toggleTerm(v: string) {
      this.$emit('toggleTerm', v);
    },
  },
});
</script>
