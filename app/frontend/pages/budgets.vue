<template>
  <div>
    <app-title text="予算管理"></app-title>
    <budget-slider />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BudgetSlider from '~/components/BudgetSlider.vue';

export default Vue.extend({
  name: 'BudgetsPage',
  components: {
    BudgetSlider,
  },
  middleware: 'auth',
  head: {
    title: '予算管理',
  },
});
</script>
