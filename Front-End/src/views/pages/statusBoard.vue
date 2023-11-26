<template>
    <div>
      <div v-for="(statusCount, status) in statusCounts" :key="status">
        <div class="flex items-center p-2 rounded-md ">
          <div class="flex  items-center">
                        <v-icon
              v-if="status === '1'"
              class="text-blue-500 bg-blue-100 rounded-full p-4"
            >
              mdi-eye
            </v-icon>
            <v-icon
              v-else-if="status === '2'"
              class="text-blue-500 bg-blue-100 rounded-full p-4"
            >
              mdi-phone
            </v-icon>
            <v-icon
              v-else-if="status === '3'"
              class="text-blue-500 bg-blue-100 rounded-full p-4"
            >
              mdi-account-multiple
            </v-icon>
            <v-icon
              v-else-if="status === '4'"
              class="text-blue-500 bg-blue-100 rounded-full p-4"
            >
              mdi-account-check
            </v-icon>
            <v-icon
              v-else-if="status === '5'"
              class="text-blue-500 bg-blue-100 rounded-full p-4"
            >
              mdi-thumb-up
            </v-icon>
   <span style="margin-right: 3px; margin-left:13px; width:20px;">{{ getStatusLabel(status) }}</span></div>
        <v-progress-linear
          color="primary"
          bg-color="pink-lighten-3"
          :model-value="progressValue(statusCount)"
          >
          <template v-slot:default>
            <!-- <strong>{{ progressValue(statusCount) }}%</strong> -->
          </template>
        </v-progress-linear>
        <span style="margin-left: 70px;">{{ statusCount }} </span>
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
        maximumCount: 7, // Maximum count for each status
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