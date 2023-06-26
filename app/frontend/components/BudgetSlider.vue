<template>
  <div>
    <no-ssr>
      <vue-slider v-model="value"></vue-slider>
    </no-ssr>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueSlider from 'vue-slider-component';

export default Vue.extend({
  components: { VueSlider },
  data() {
    return {
      value: 0,
    };
  },
});
</script>
