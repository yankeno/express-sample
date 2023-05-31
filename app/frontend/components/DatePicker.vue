<template>
  <div>
    <v-row dense>
      <v-col cols="9">
        <v-text-field
          v-model="dateRangeText"
          prepend-icon="mdi-calendar"
          readonly
          dense
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <v-date-picker
          v-model="dates"
          elevation="10"
          width="300"
          dense
          range
        ></v-date-picker>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DatePicker',
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
