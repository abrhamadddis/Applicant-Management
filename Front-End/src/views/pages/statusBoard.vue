<template>
    <div>
      <div v-for="(statusCount, status) in statusCounts" :key="status">
        <div style="display: flex; align-items: center;">
      <span style="margin-right: 10px; width:30px;">{{ getStatusLabel(status) }}</span>
        <v-progress-linear
          color="primary"
          bg-color="pink-lighten-3"
          :model-value="progressValue(statusCount)"
          >
          <template v-slot:default>
            <!-- <strong>{{ progressValue(statusCount) }}%</strong> -->
          </template>
        </v-progress-linear>
        <span style="margin-left: 50px;">{{ statusCount }} </span>
        <br>
        <br>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import data from '../../assets/tables/dataTable';
  
  export default {
    data() {
      return {
        maximumCount: 10, // Maximum count for each status
      };
    },
    computed: {
      statusCounts() {
        const counts = {};
        for (const item of data) {
          const status = item.status;
          counts[status] = (counts[status] || 0) + 1;
        }
        return counts;
      },
    },
    methods: {
      progressValue(statusCount) {
        return parseInt((statusCount * 100) / this.maximumCount);
      },
      getStatusLabel(status) {
        switch (status) {
          case '1':
            return 'Screening';
          case '2':
            return 'Phone Interview';
          case '3':
            return 'Meeting';
          case '4':
            return 'Interview';
          case '5':
            return 'Approve';
          default:
            return '';
        }
      },
    },
  };
  </script>