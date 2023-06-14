<template>
  <div>
    <b-table hover :items="items" :fields="fields">
      <template #cell(last_name)>
        <input type="text" />
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CashflowTable',
  data() {
    return {
      // Note `isActive` is left out and will not appear in the rendered table
      fields: [
        { key: 'date', label: '日付', sortable: true },
        { key: 'description', label: '内容', sortable: true },
        { key: 'price', label: '金額', sortable: true },
        { key: 'parent_category', label: '親カテゴリ', sortable: false },
        { key: 'child_category', label: '子カテゴリ', sortable: false },
        { key: 'comment', label: 'メモ', sortable: false },
      ],
      items: [
        {
          date: '6/1',
          description: 'Amazon Japan',
          price: 3000,
          parent_category: '日用品',
          child_category: 'その他日用品',
          comment: 'ネットショッピング',
        },
        {
          date: '6/2',
          description: 'Amazon Japan',
          price: 3000,
          parent_category: '日用品',
          child_category: 'その他日用品',
          comment: 'ネットショッピング',
        },
        {
          date: '6/3',
          description: 'Amazon Japan',
          price: 3000,
          parent_category: '日用品',
          child_category: 'その他日用品',
          comment: 'ネットショッピング',
        },
        {
          date: '6/4',
          description: 'Amazon Japan',
          price: 3000,
          parent_category: '日用品',
          child_category: 'その他日用品',
          comment: 'ネットショッピング',
        },
        {
          date: '6/5',
          description: 'Amazon Japan',
          price: 3000,
          parent_category: '日用品',
          child_category: 'その他日用品',
          comment: 'ネットショッピング',
        },
      ],
    };
  },
});
</script>
