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
      <template #cell(comment)>
        <comment-input />
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
