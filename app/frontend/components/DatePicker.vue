<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="dateRangeText"
          label="Date range"
          prepend-icon="mdi-calendar"
          readonly
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-date-picker v-model="dates" range></v-date-picker>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      dates: [
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substring(0, 10),
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substring(0, 10),
      ],
    };
  },
  computed: {
    dateRangeText() {
      return this.dates.join(' ~ ');
    },
  },
};
</script>