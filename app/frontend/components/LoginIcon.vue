<template>
  <div id="circle">
    <BIconBoxArrowRight id="icon"></BIconBoxArrowRight>
  </div>
</template>

<script>
import Vue from 'vue';
import { BIconBoxArrowRight } from 'bootstrap-vue';

export default Vue.extend({
  name: 'LoginIcon',
  components: {
    BIconBoxArrowRight,
  },
});
</script>

<style scoped>
#circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #17a2b8;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}
#icon {
  width: 30px;
  height: 30px;
}
</style>
