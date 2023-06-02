<template>
  <v-container class="container" fluid>
    <v-row>
      <v-col class="d-flex" justify-center cols="12">
        <v-select
          v-model="selectedParent"
          :items="parentCategories"
          item-value="id"
          item-text="name"
          label="親カテゴリ"
          class="category"
          dense
          solo
        ></v-select>
        <div>&nbsp;</div>
        <v-select
          v-model="selectedChild"
          :items="childItems"
          item-value="id"
          item-text="name"
          label="子カテゴリ"
          class="category"
          dense
          solo
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex" justify-center cols="12">
        <v-text-field v-model="price" label="金額" suffix="円"></v-text-field>
        <div>&nbsp;</div>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="日付"
              readonly
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-text-field v-model="comment" label="メモ"></v-text-field>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12">
        <div class="text-center">
          <v-btn @click="submitSpending" rounded color="primary" dark>
            保存する</v-btn
          >
        </div>
      </v-col>
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
      selectedParent: null as null | number,
      selectedChild: null as null | number,
      price: null as null | number,
      comment: null as null | string,
      parentCategories: [] as Array<ParentCategory>,
      childItems: [] as Array<Category>,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substring(0, 10),
      menu: false,
    };
  },
  watch: {
    selectedParent(v) {
      if (v === null) return;
      const selectedParent = this.parentCategories.filter((i) => i.id === v);
      this.childItems = selectedParent[0].categories;
      this.selectedChild = null;
    },
  },
  async mounted() {
    const response = await this.$axios.$get('/api/category');
    this.parentCategories = response.data;
  },
  methods: {
    async submitSpending() {
      await this.$axios
        .post('/api/spending/create', {
          user_id: 1,
          category_id: this.selectedChild,
          date: this.date,
          price: this.price,
          comment: this.comment,
        })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error('Bad request');
          }
          this.$toast.open({
            message: '支出を登録しました。',
            position: 'top',
          });
          this.selectedParent = null;
          this.selectedChild = null;
          this.price = null;
          this.comment = null;
          this.date = new Date(
            Date.now() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .substring(0, 10);
        })
        .catch((error) => {
          this.$toast.open({
            type: error,
            message: '支出の登録に失敗しました。',
            position: 'top',
          });
        });
    },
  },
});
</script>

<style scoped>
.container {
  background-color: #f4f4f4;
  padding: 20px;
}
.category {
  width: 150px;
}
</style>
