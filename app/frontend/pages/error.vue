<template>
  <div>
    <h1 v-if="error.statusCode === 404">Page Not Found</h1>
    <h1 v-else-if="error.statusCode === 500">Internal Server Error</h1>
    <h1 v-else>Error</h1>
    <p>{{ error.message }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ErrorPage',
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
};
</script>
