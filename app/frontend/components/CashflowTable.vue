<template>
  <div>
    <b-table
      hover
      :items="items"
      :fields="fields"
      :sort-by.sync="sortBy"
      :busy="isBusy"
      head-variant="light"
      responsive="sm"
    >
      <template #cell(comment)="data">
        <comment-input :id="data.item.price" :comment="data.item.comment" />
      </template>
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
import CommentInput from './CommentInput.vue';

export default Vue.extend({
  name: 'CashflowTable',
  components: {
    CommentInput,
  },
  data() {
    return {
      isBusy: false,
      sortBy: 'date',
      fields: [
        { key: 'date', label: '日付', sortable: true },
        { key: 'description', label: '内容', sortable: true },
        { key: 'price', label: '金額', sortable: true },
        { key: 'parent_category', label: '親カテゴリ', sortable: true },
        { key: 'child_category', label: '子カテゴリ', sortable: true },
        { key: 'comment', label: 'メモ', sortable: false },
      ],
      items: [] as Array<Object>,
    };
  },
  async mounted() {
    const month = format(new Date(), 'yyyy-MM');
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
        // parent_category: v.category
      });
    });
  },
});
</script>
