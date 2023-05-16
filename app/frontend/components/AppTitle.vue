<template>
  <div id="titleContainer">
    <h1 id="pageTitle">{{ appTitle }}</h1>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AppTitle',
  props: {
    appTitle: {
      type: String,
      default: 'タイトル',
    },
  },
}
</script>

<style scoped>
#titleContainer {
  color: #444444;
}
#pageTitle {
  padding: 0.1em;
  margin-bottom: 0.5em;
  border-bottom: 1px solid #dcdcdc;
}
</style>
