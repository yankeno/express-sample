<template>
  <div>
    <v-card id="section">
      <b-form @submit.prevent="submitBudgets">
        <v-container>
          <v-row>
            <v-col cols="2" class="align-middle">
              <div>
                <label for="date-input" class="text-sm">日予算：</label>
                <b-form-input
                  id="date-input"
                  v-model="dateBudget"
                  :state="!Boolean(dateErrorMsg)"
                  placeholder="1000"
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
          <b-button type="submit" pill variant="info" class="text-white"
            >Button</b-button
          >
        </v-container>
      </b-form>
    </v-card>

    <no-ssr>
      <VueSlider
        v-model="weekBudget"
        :height="20"
        :tooltip="'always'"
        :dot-size="20"
        :min="0"
        :max="weekMax"
        :interval="1000"
      ></VueSlider>
    </no-ssr>
    <no-ssr>
      <VueSlider
        v-model="monthBudget"
        :height="20"
        :tooltip="'always'"
        :dot-size="20"
        :min="0"
        :max="monthMax"
        :interval="10000"
      ></VueSlider>
    </no-ssr>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

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
  methods: {
    dateError(type: number, msg: string) {
      switch (type) {
        case ERROR_TYPE.MIN:
          break;
        case ERROR_TYPE.MAX:
          break;
        case ERROR_TYPE.VALUE:
          break;
      }
      this.dateErrorMsg = `${msg}(${this.dateMax})`;
    },
    weekError(type: number, msg: string) {
      switch (type) {
        case ERROR_TYPE.MIN:
          break;
        case ERROR_TYPE.MAX:
          break;
        case ERROR_TYPE.VALUE:
          break;
      }
      this.weekErrorMsg = `${msg}(${this.weekMax})`;
    },
    monthError(type: number, msg: string) {
      switch (type) {
        case ERROR_TYPE.MIN:
          break;
        case ERROR_TYPE.MAX:
          break;
        case ERROR_TYPE.VALUE:
          break;
      }
      this.monthErrorMsg = `${msg}(${this.monthMax})`;
    },
    threeMonthsError(type: number, msg: string) {
      switch (type) {
        case ERROR_TYPE.MIN:
          break;
        case ERROR_TYPE.MAX:
          break;
        case ERROR_TYPE.VALUE:
          break;
      }
      this.threeMonthsErrorMsg = `${msg}(${this.threeMonthsMax})`;
    },
    halfAYearError(type: number, msg: string) {
      switch (type) {
        case ERROR_TYPE.MIN:
          break;
        case ERROR_TYPE.MAX:
          break;
        case ERROR_TYPE.VALUE:
          break;
      }
      this.halfAMonthErrorMsg = `${msg}(${this.halfAYearMax})`;
    },
    yearError(type: number, msg: string) {
      switch (type) {
        case ERROR_TYPE.MIN:
          break;
        case ERROR_TYPE.MAX:
          break;
        case ERROR_TYPE.VALUE:
          break;
      }
      this.yearErrorMsg = `${msg}(${this.yearMax})`;
    },
    clearDateErrorMsg() {
      this.dateErrorMsg = '';
    },
    clearWeekErrorMsg() {
      this.weekErrorMsg = '';
    },
    clearMonthErrorMsg() {
      this.dateErrorMsg = '';
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
    submitBudgets() {
      console.log('submit');
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
