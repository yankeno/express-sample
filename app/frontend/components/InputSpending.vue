<template>
  <v-container fluid>
    <v-row align="center">
      <v-col class="d-flex" cols="10" sm="6">
        <v-select :items="items"></v-select>
        <v-select :items="items"></v-select>
      </v-col>
      <v-text-field label="金額" :rules="rules"></v-text-field>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'InputSpending',
  data: () => ({
    items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    rules: [
      (value: any) => !!value || 'Required.',
      (value: any): Boolean | string =>
        (value && !isNaN(value)) || 'Numbers only',
    ],
    parentCategories: [],
  }),
  async created() {
    this.parentCategories = await this.$axios.$get('/api/category');
  },
});
</script>
