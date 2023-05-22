<template>
  <div>
    <div class="mt-3">
      <b-button-group size="sm">
        <b-button class="selected">日</b-button>
        <b-button>週</b-button>
        <b-button>月</b-button>
      </b-button-group>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'PeriodButton',
});
</script>

<style>
.selected {
  opacity: 0.8;
}
</style>
