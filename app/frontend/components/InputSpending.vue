<template>
  <v-container>
    <v-row align="center">
      <v-col class="d-flex" cols="10" sm="6">
        <v-select
          v-model="selectedParent"
          :items="parentCategories"
          item-value="id"
          item-text="name"
          label="親カテゴリ"
        ></v-select>
        <v-select
          v-model="selectedChild"
          :items="childItems"
          item-value="id"
          item-text="name"
          label="子カテゴリ"
        ></v-select>
      </v-col>
      <v-text-field label="金額" :rules="rules"></v-text-field>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { ParentCategory, Category } from '../types/category';

export default Vue.extend({
  name: 'InputSpending',
  data() {
    return {
      rules: [
        (value: any) => !!value || 'Required',
        (value: any): Boolean | string =>
          (value && !isNaN(value)) || 'Numbers only',
      ],
      selectedParent: null as null | number,
      selectedChild: null as null | number,
      parentCategories: [] as Array<ParentCategory>,
      childItems: [] as Array<Category>,
    };
  },
  watch: {
    selectedParent(v) {
      const selectedParent = this.parentCategories.filter((i) => i.id === v);
      this.childItems = selectedParent[0].categories;
      this.selectedChild = null;
    },
  },
  async mounted() {
    const response = await this.$axios.$get('/api/category');
    this.parentCategories = response.data;
  },
});
</script>
