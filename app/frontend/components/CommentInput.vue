<template>
  <div>
    <b-row>
      <b-col>
        <b-form-input
          id="input-small"
          size="sm"
          class="height60Percent"
        ></b-form-input>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'CommentInput',
  props: {
    id: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: false,
      default: '',
    },
  },
});
</script>

<style>
.height60Percent {
  height: 1.5em;
  border: none;
  color: #000;
  padding: 0 0.5rem;
}
</style>
