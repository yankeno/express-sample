<template>
  <div>
    <header-menu />
    <div id="contentContainer">
      <nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import HeaderMenu from '@/components/Header.vue'

export default {
  name: 'DefaultTemplate',
  components: {
    HeaderMenu,
  },
}
</script>

<style scoped>
#contentContainer {
  padding: 4em 2em 1em;
}
</style>
