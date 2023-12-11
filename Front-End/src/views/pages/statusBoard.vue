<template>
    <div class="shadow-lg  p-6">

      <p class="text-black-500 px-2 py-2 text-xl">Stages</p>
      <div v-for="(statusCount, status ) in statusCounts" :key="status">
        <div class="flex items-center p-2 m-2 rounded-md ">
          <div class="flex  items-center " style="width:24vw">
                        <v-icon
                        
              v-if="status === 'Rejected'"
              class="text-primary bg-deep-orange-lighten-5 rounded-full p-4"
            >
              mdi-eye
            </v-icon>
            <v-icon
              v-else-if="status === 'Interviewed'"
              class="text-primary bg-deep-orange-lighten-5 rounded-full p-4"
            >
              mdi-phone
            </v-icon>
            <v-icon
              v-else-if="status === 'Pending'"
              class="text-primary bg-deep-orange-lighten-5 rounded-full p-4"
            >
              mdi-account-multiple
            </v-icon>
            <v-icon
              v-else-if="status === 'Offered'"
              class="text-primary bg-deep-orange-lighten-5 rounded-full p-4"
            >
              mdi-account-check
            </v-icon>
            <v-icon
              v-else-if="status === 'Hired'"
              class="text-primary bg-deep-orange-lighten-5 rounded-full p-4"
            >
              mdi-thumb-up
            </v-icon>
   <span style="margin-right: 5px; margin-left:10px; ">{{ getStatusLabel(status) }}</span></div>
   <div style="width: 70vw;">

     <v-progress-linear
     color="primary"
     bg-color="pink-lighten-3"
     :model-value="progressValue(statusCount)"
     stream          
     >
     <!-- <template v-slot:default>
       <strong>{{ progressValue(statusCount) }}%</strong>
      </template> -->
    </v-progress-linear>
  </div>    
        <span style="margin-left: 7px; width:5vw;">{{ statusCount }} </span>
        
        </div>
      </div>
     
    </div>
  </template>
  
  <script>
  // import data from '../../assets/tables/dataTable';
  import axios from 'axios';
  import { useAuthStore } from '../../store/auth';

  export default {
    data() {
      return {
        maximumCount: 27, // Maximum count for each status
        candidates: [], 
      };
    },
    computed: {
    statusCounts() {
      const counts = {};

      // Assuming candidates have been fetched and the status is in 'status' property
      for (const item of this.candidates) {
        const status = item.status;
        console.log(status);
        counts[status] = (counts[status] || 0) + 1;
      }

      return counts;
    },
  },
    created() {
    this.fetchCandidates(); // Fetch candidates when the component is created
  },
    methods: {
      async fetchCandidates() {
      try {
        const authStore = useAuthStore(); // Get access to the auth store
        const token = authStore.token; // Get the token from the auth store

        // const response = await axios.get('http://localhost:8010/api/candidates');
        const response = await axios.get('http://localhost:8010/api/candidates', {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        });
        this.candidates = response.data; // Assuming candidates data is available in response.data
        console.log('THIS IS STATUS BOARD CANDIDATE LIST',this.candidates);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    },
      progressValue(statusCount) {
        return parseInt((statusCount * 100) / this.maximumCount);
      },
      getStatusLabel(status) {
        
        switch (status) {
          case 'Rejected':
            return 'Rejected';
          case 'Interviewed':
            return 'Interviewed';
          case 'Pending':
            return 'Pending';
          case 'Offered':
            return 'Offered';
          case 'Hired':
            return 'Hired';
          default:
            return '';
        }
      },
    },
  };
  </script>

