<template>
  <div>
    <no-ssr>
      <VueSlider
        v-model="dateBudget"
        :height="20"
        :tooltip="'always'"
        :dot-size="20"
        :min="0"
        :max="dateMax"
        :interval="1000"
      ></VueSlider>
    </no-ssr>
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
        :interval="1000"
      ></VueSlider>
    </no-ssr>
    <!-- <input v-model="dateBudget" type="text" /> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
if (process.client) require('vue-slider-component');

const dateMax = 10000 as const;
const weekMax = 70000 as const;
const monthMax = 300000 as const;
const step = 1000 as const;

export default Vue.extend({
  data() {
    return {
      dateBudget: 0,
      weekBudget: 0,
      monthBudget: 0,
      dateMax,
      weekMax,
      monthMax,
    };
  },
});
</script>
