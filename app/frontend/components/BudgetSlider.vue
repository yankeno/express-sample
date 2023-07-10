<template>
  <div>
    <v-card id="section">
      <v-container>
        <v-row>
          <v-col cols="2">
            <div>
              <!-- <input v-model="dateBudget" @input="clearDateErrorMsg" /> -->
              <b-form-input
                id="input-valid"
                v-model="dateBudget"
                :state="!Boolean(dateErrorMsg)"
                placeholder="1000"
                @input="clearDateErrorMsg"
              ></b-form-input>
            </div>
          </v-col>
          <v-col cols="10">
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
          </v-col>
        </v-row>
      </v-container>
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
const halfAMonthMax = 5000000 as const;
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
      halfAMonthMax,
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
  },
});
</script>
