<template>
  <div>
    <v-card id="section" class="p-3">
      <b-form @submit.prevent="submitBudgets">
        <v-container>
          <v-row>
            <v-col cols="2" class="align-middle">
              <div>
                <label for="date-input" class="text-sm">日予算(円)：</label>
                <b-form-input
                  id="date-input"
                  v-model="dateBudget"
                  :state="!Boolean(dateErrorMsg)"
                  placeholder="1000"
                  type="number"
                  @input="clearDateErrorMsg"
                ></b-form-input>
              </div>
            </v-col>
            <v-col cols="10" class="pt-4">
              <div class="px-5">
                <no-ssr>
                  <span style="color: red; margin-left: 20px">{{
                    dateErrorMsg
                  }}</span>
                  <VueSlider
                    v-model="dateBudget"
                    :height="20"
                    :tooltip="dateErrorMsg ? 'none' : 'always'"
                    :dot-size="20"
                    :min="0"
                    :max="dateMax"
                    :interval="100"
                    @error="dateError"
                    @change="clearDateErrorMsg"
                  ></VueSlider>
                </no-ssr>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2" class="align-middle">
              <div>
                <label for="week-input" class="text-sm">週予算(円)：</label>
                <b-form-input
                  id="week-input"
                  v-model="weekBudget"
                  :state="!Boolean(weekErrorMsg)"
                  placeholder="30000"
                  type="number"
                  @input="clearWeekErrorMsg"
                ></b-form-input>
              </div>
            </v-col>
            <v-col cols="10" class="pt-4">
              <div class="px-5">
                <no-ssr>
                  <span style="color: red; margin-left: 20px">{{
                    weekErrorMsg
                  }}</span>
                  <VueSlider
                    v-model="weekBudget"
                    :height="20"
                    :tooltip="weekErrorMsg ? 'none' : 'always'"
                    :dot-size="20"
                    :min="0"
                    :max="weekMax"
                    :interval="5000"
                    @error="weekError"
                    @change="clearWeekErrorMsg"
                  ></VueSlider>
                </no-ssr>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2" class="align-middle">
              <div>
                <label for="month-input" class="text-sm">月予算(円)：</label>
                <b-form-input
                  id="month-input"
                  v-model="monthBudget"
                  :state="!Boolean(monthErrorMsg)"
                  placeholder="200000"
                  type="number"
                  @input="clearMonthErrorMsg"
                ></b-form-input>
              </div>
            </v-col>
            <v-col cols="10" class="pt-4">
              <div class="px-5">
                <no-ssr>
                  <span style="color: red; margin-left: 20px">{{
                    monthErrorMsg
                  }}</span>
                  <VueSlider
                    v-model="monthBudget"
                    :height="20"
                    :tooltip="monthErrorMsg ? 'none' : 'always'"
                    :dot-size="20"
                    :min="0"
                    :max="monthMax"
                    :interval="10000"
                    @error="monthError"
                    @change="clearMonthErrorMsg"
                  ></VueSlider>
                </no-ssr>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2" class="align-middle">
              <div>
                <label for="three-months-input" class="text-sm"
                  >3ヶ月予算(円)：</label
                >
                <b-form-input
                  id="three-months-input"
                  v-model="threeMonthsBudget"
                  :state="!Boolean(threeMonthsErrorMsg)"
                  placeholder="600000"
                  type="number"
                  @input="clearThreeMonthsErrorMsg"
                ></b-form-input>
              </div>
            </v-col>
            <v-col cols="10" class="pt-4">
              <div class="px-5">
                <no-ssr>
                  <span style="color: red; margin-left: 20px">{{
                    threeMonthsErrorMsg
                  }}</span>
                  <VueSlider
                    v-model="threeMonthsBudget"
                    :height="20"
                    :tooltip="threeMonthsErrorMsg ? 'none' : 'always'"
                    :dot-size="20"
                    :min="0"
                    :max="threeMonthsMax"
                    :interval="10000"
                    @error="threeMonthsError"
                    @change="clearThreeMonthsErrorMsg"
                  ></VueSlider>
                </no-ssr>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2" class="align-middle">
              <div>
                <label for="half-a-year-input" class="text-sm"
                  >半年予算(円)：</label
                >
                <b-form-input
                  id="half-a-year-input"
                  v-model="halfAMonthBudget"
                  :state="!Boolean(halfAMonthErrorMsg)"
                  placeholder="1500000"
                  type="number"
                  @input="clearHalfAMonthErrorMsg"
                ></b-form-input>
              </div>
            </v-col>
            <v-col cols="10" class="pt-4">
              <div class="px-5">
                <no-ssr>
                  <span style="color: red; margin-left: 20px">{{
                    halfAMonthErrorMsg
                  }}</span>
                  <VueSlider
                    v-model="halfAMonthBudget"
                    :height="20"
                    :tooltip="halfAMonthErrorMsg ? 'none' : 'always'"
                    :dot-size="20"
                    :min="0"
                    :max="halfAYearMax"
                    :interval="10000"
                    @error="halfAYearError"
                    @change="clearHalfAMonthErrorMsg"
                  ></VueSlider>
                </no-ssr>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2" class="align-middle">
              <div>
                <label for="year-input" class="text-sm">年予算(円)：</label>
                <b-form-input
                  id="year-input"
                  v-model="yearBudget"
                  :state="!Boolean(yearErrorMsg)"
                  placeholder="3000000"
                  type="number"
                  @input="clearYearErrorMsg"
                ></b-form-input>
              </div>
            </v-col>
            <v-col cols="10" class="pt-4">
              <div class="px-5">
                <no-ssr>
                  <span style="color: red; margin-left: 20px">{{
                    yearErrorMsg
                  }}</span>
                  <VueSlider
                    v-model="yearBudget"
                    :height="20"
                    :tooltip="yearErrorMsg ? 'none' : 'always'"
                    :dot-size="20"
                    :min="0"
                    :max="yearMax"
                    :interval="100000"
                    @error="yearError"
                    @change="clearYearErrorMsg"
                  ></VueSlider>
                </no-ssr>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="text-center">
              <b-button
                type="submit"
                pill
                variant="info"
                class="text-white mt-3"
                >保存する</b-button
              >
            </v-col>
          </v-row>
        </v-container>
      </b-form>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { BudgetResponse, BudgetRequest } from '../types/budget';
import { PERIOD_EN, PERIOD_ID } from '../constants/period';

const ERROR_TYPE = {
  VALUE: 1,
  INTERVAL: 2,
  MIN: 3,
  MAX: 4,
  ORDER: 5,
};

const dateMax = 10000 as const;
const weekMax = 70000 as const;
const monthMax = 300000 as const;
const threeMonthsMax = 2000000 as const;
const halfAYearMax = 5000000 as const;
const yearMax = 10000000 as const;

export default Vue.extend({
  data() {
    return {
      dateBudget: 0,
      weekBudget: 0,
      monthBudget: 0,
      threeMonthsBudget: 0,
      halfAMonthBudget: 0,
      yearBudget: 0,
      dateId: 0 as number | undefined,
      weekId: 0 as number | undefined,
      monthId: 0 as number | undefined,
      threeMonthId: 0 as number | undefined,
      halfAMonthId: 0 as number | undefined,
      yearId: 0 as number | undefined,
      dateMax,
      weekMax,
      monthMax,
      threeMonthsMax,
      halfAYearMax,
      yearMax,
      dateErrorMsg: '',
      weekErrorMsg: '',
      monthErrorMsg: '',
      threeMonthsErrorMsg: '',
      halfAMonthErrorMsg: '',
      yearErrorMsg: '',
    };
  },

  async created() {
    const response = await this.$axios.get(`/api/budget?id=${1}`);
    const budgets: Array<BudgetResponse> = response.data.data;
    budgets.forEach((budget) => {
      switch (budget.period_en) {
        case PERIOD_EN.day:
          this.dateBudget = budget.amount;
          this.dateId = budget.id;
          break;
        case PERIOD_EN.week:
          this.weekBudget = budget.amount;
          this.weekId = budget.id;
          break;
        case PERIOD_EN.month:
          this.monthBudget = budget.amount;
          this.monthId = budget.id;
          break;
        case PERIOD_EN.three_month:
          this.threeMonthsBudget = budget.amount;
          this.threeMonthId = budget.id;
          break;
        case PERIOD_EN.half_a_year:
          this.halfAMonthBudget = budget.amount;
          this.halfAMonthId = budget.id;
          break;
        case PERIOD_EN.year:
          this.yearBudget = budget.amount;
          this.yearId = budget.id;
          break;
      }
    });
  },
  methods: {
    dateError(type: number) {
      switch (type) {
        case ERROR_TYPE.MIN:
          this.dateErrorMsg = '0以上の数値を指定してください。';
          break;
        case ERROR_TYPE.MAX:
          this.dateErrorMsg = `${dateMax}以下の数値を指定してください。`;
          break;
      }
    },
    weekError(type: number) {
      switch (type) {
        case ERROR_TYPE.MIN:
          this.weekErrorMsg = '0以上の数値を指定してください。';
          break;
        case ERROR_TYPE.MAX:
          this.weekErrorMsg = `${weekMax}以下の数値を指定してください。`;
          break;
      }
    },
    monthError(type: number) {
      switch (type) {
        case ERROR_TYPE.MIN:
          this.monthErrorMsg = '0以上の数値を指定してください。';
          break;
        case ERROR_TYPE.MAX:
          this.monthErrorMsg = `${monthMax}以下の数値を指定してください。`;
          break;
      }
    },
    threeMonthsError(type: number) {
      switch (type) {
        case ERROR_TYPE.MIN:
          this.threeMonthsErrorMsg = '0以上の数値を指定してください。';
          break;
        case ERROR_TYPE.MAX:
          this.threeMonthsErrorMsg = `${threeMonthsMax}以下の数値を指定してください。`;
          break;
      }
    },
    halfAYearError(type: number) {
      switch (type) {
        case ERROR_TYPE.MIN:
          this.halfAMonthErrorMsg = '0以上の数値を指定してください。';
          break;
        case ERROR_TYPE.MAX:
          this.halfAMonthErrorMsg = `${halfAYearMax}以下の数値を指定してください。`;
          break;
      }
    },
    yearError(type: number) {
      switch (type) {
        case ERROR_TYPE.MIN:
          this.yearErrorMsg = '0以上の数値を指定してください。';
          break;
        case ERROR_TYPE.MAX:
          this.yearErrorMsg = `${yearMax}以下の数値を指定してください。`;
          break;
      }
    },
    clearDateErrorMsg() {
      this.dateErrorMsg = '';
    },
    clearWeekErrorMsg() {
      this.weekErrorMsg = '';
    },
    clearMonthErrorMsg() {
      this.monthErrorMsg = '';
    },
    clearThreeMonthsErrorMsg() {
      this.threeMonthsErrorMsg = '';
    },
    clearHalfAMonthErrorMsg() {
      this.halfAMonthErrorMsg = '';
    },
    clearYearErrorMsg() {
      this.yearErrorMsg = '';
    },
    async submitBudgets() {
      const tempUserId = 1 as const;
      if (
        this.dateErrorMsg ||
        this.weekErrorMsg ||
        this.monthErrorMsg ||
        this.threeMonthsErrorMsg ||
        this.halfAMonthErrorMsg ||
        this.yearErrorMsg
      ) {
        this.$toast.open({
          type: 'error',
          message: '予算の保存に失敗しました。',
          position: 'top',
        });
        return;
      }
      const budgets: Array<BudgetRequest> = [
        {
          id: this.dateId,
          user_id: tempUserId,
          period_id: PERIOD_ID.day,
          amount: this.dateBudget,
        },
        {
          id: this.weekId,
          user_id: tempUserId,
          period_id: PERIOD_ID.week,
          amount: this.weekBudget,
        },
        {
          id: this.monthId,
          user_id: tempUserId,
          period_id: PERIOD_ID.month,
          amount: this.monthBudget,
        },
        {
          id: this.threeMonthId,
          user_id: tempUserId,
          period_id: PERIOD_ID.three_month,
          amount: this.threeMonthsBudget,
        },
        {
          id: this.halfAMonthId,
          user_id: tempUserId,
          period_id: PERIOD_ID.half_a_year,
          amount: this.halfAMonthBudget,
        },
        {
          id: this.yearId,
          user_id: tempUserId,
          period_id: PERIOD_ID.year,
          amount: this.yearBudget,
        },
      ];
      await this.$axios
        .post(`/api/budget/upsert?id=${1}`, budgets)
        .then((res) => {
          if (res.status !== 200) {
            throw new Error('Bad request');
          }
          this.$toast.open({
            message: '予算を保存しました。',
            position: 'top',
          });
        })
        .catch((e) => {
          this.$toast.open({
            type: 'error',
            message: '予算の保存に失敗しました。',
            position: 'top',
          });
          console.error(e);
        });
    },
  },
});
</script>
<style scoped>
.text-white {
  color: white;
}
.text-sm {
  font-size: small;
}
</style>
