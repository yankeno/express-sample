<template>
  <div>
    <app-title text="家計簿"></app-title>
    <cashflow-table />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CashflowTable from '~/components/CashflowTable.vue';

export default Vue.extend({
  name: 'CashflowPage',
  components: {
    CashflowTable,
  },
  middleware: 'auth',
  head: {
    title: '家計簿',
  },
});
</script>
