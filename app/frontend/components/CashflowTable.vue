<template>
  <div>
    <v-row>
      <v-col cols="3">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="対象月"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" type="month" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)"
              >OK</v-btn
            >
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <b-table
      hover
      :items="items"
      :fields="fields"
      :sort-by.sync="sortBy"
      :busy="isBusy"
      head-variant="light"
      responsive="sm"
    >
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { format } from 'date-fns';
import { Spending } from '../types/spending';

export default Vue.extend({
  name: 'CashflowTable',
  data() {
    return {
      isBusy: false,
      sortBy: 'date',
      fields: [
        { key: 'date', label: '日付', sortable: true },
        { key: 'description', label: '内容', sortable: true },
        {
          key: 'price',
          label: '金額(円)',
          sortable: true,
          formatter: (value: number) => {
            return value.toLocaleString();
          },
        },
        { key: 'parent_category', label: '親カテゴリ', sortable: true },
        { key: 'child_category', label: '子カテゴリ', sortable: true },
        { key: 'comment', label: 'メモ', sortable: false },
      ],
      items: [] as Array<Object>,
      date: new Date().toISOString().substring(0, 7),
      menu: false,
    };
  },
  watch: {
    date(newMonth) {
      this.items = [];
      this.fetchSpendings(newMonth);
    },
  },
  mounted() {
    const month = format(new Date(), 'yyyy-MM');
    this.fetchSpendings(month);
  },
  methods: {
    async fetchSpendings(month: string) {
      const response = await this.$axios.get(
        `/api/spending/list?id=1&month=${month}`
      );
      const spendings: Array<Spending> = response.data.data;
      spendings.forEach((v) => {
        this.items.push({
          id: v.id,
          date: v.date,
          description: v.description,
          price: v.price,
          parent_category: v.parent_category_name,
          child_category: v.category_name,
          comment: v.comment,
        });
      });
    },
  },
});
</script>
