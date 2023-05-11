<template>
  <div>
    <header-menu />
    <nuxt />
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
