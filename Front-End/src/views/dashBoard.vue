<script setup>
import statusBoard from '@/views/pages/statusBoard.vue'
import CardStatisticsVertical from '../@core/components/cards/CardStatisticsVertical.vue'
// 👉 Images
import chart from '../assets/chart-success.png'
import wallet from '../assets/wallet-info.png'
import { useRouter } from 'vue-router';
import datatable from '../assets/tables/dataTable';
import jobtable from '../assets/tables/jobTable';
// const data = datatable;
const router = useRouter();

// Function to navigate to the jobPage
const goToJobPage = () => {
  router.push('/jobs');
};
const goToCandidatePage = () => {
  router.push('/candidates');
};

</script>
<script>


export default {
  data() {
    return {
      // chart: 'path/to/chart.png',
      data: datatable, // Assuming datatable.js exports an object with a candidates property
      jobs: jobtable,
    };
  },

 
  methods: {
    getCandidateCount() {
      // Access the number of candidates from the datatable.js file
      return this.data.length; // Access the length of the array

    },
    getJobsCount() {
      return this.jobs.length;
    }
  },
};
</script>

<template>
  <VRow
  class="mx-6 my-6" >

    <!-- 👉 Congratulations -->
    <VCol
      cols="12"
      md="8"
    >
      <statusBoard />
    </VCol>

    <VCol
      cols="12"
      sm="4"
    >
      <VRow>
        <!-- 👉 Profit -->
        <VCol
          cols="12"
          md="6"
        >
          <!-- <CardStatisticsVertical
            v-bind="{
              title: '  New    __  Openings  ',
              image: chart,
            }"
          /><button @click="$router.push('/jobs')">+</button> -->
    
      <div class="bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300">
    <div class="h-1 bg-gradient-to-r from-blue-400 to-blue-600 animate-shimmer"></div>
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2 text-gray-800 text-center">New Openings</div>
    </div>
    <div class="flex justify-center py-4">
      <button @click.prevent="goToJobPage" class="bg-blue-500 rounded-full p-4 transition duration-300 transform hover:scale-110 shadow-md">
        <v-icon class="text-4xl text-white">mdi-plus</v-icon>
      </button>
    </div>
  </div>

       
        </VCol>

        <!-- 👉 Sales -->
        <VCol
          cols="12"
          md="6"
        >
        <div class="bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300">
    <div class="h-1 bg-gradient-to-r from-blue-400 to-blue-600 animate-shimmer"></div>
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2 text-gray-800 text-center">Add Candidates</div>
    </div>
    <div class="flex justify-center py-4">
      <button @click.prevent="goToCandidatePage" class="bg-blue-500 rounded-full p-4 transition duration-300 transform hover:scale-110 shadow-md">
        <v-icon class="text-4xl text-white">mdi-plus</v-icon>
      </button>
    </div>
  </div>

        </VCol>
      </VRow>
    </VCol>


    <VCol
      cols="12"
      sm="12"
    >
      <VRow>
        <!-- 👉 Profit -->
        <VCol
          cols="6"
          md="3"
        >
          <CardStatisticsVertical
            v-bind="{
              title: 'Unread CVs',
              image: chart,
              stats: '18',
              change: 72.80,
            }"
          />
        </VCol>

        <VCol
          cols="6"
          md="3"
        >
          <CardStatisticsVertical
            v-bind="{
              title: 'Number of Candidate',
              image: wallet,
              stats: getCandidateCount(),
              change: 12,
            }"
          />
        </VCol>
        <VCol
          cols="6"
          md="3"
        >
          <CardStatisticsVertical
            v-bind="{
              title: 'Pending Task',
              image: wallet,
              stats: getCandidateCount(),
            }"
          />
        </VCol> 
        
        <VCol
          cols="6"
          md="3"
        >
          <CardStatisticsVertical
            v-bind="{
              title: 'Number of Jobs',
              image: wallet,
              stats: getJobsCount(),
            }"
          />
        </VCol>
          <!-- 👉 Tabs chart -->
          <!-- <VCol>
  <v-timeline direction="horizontal" line-inset="12">
    <v-timeline-item>
      <template v-slot:opposite>
        Opposite
      </template>
      Content
    </v-timeline-item>

    <v-timeline-item>
      <template v-slot:opposite>
        Opposite
      </template>
      Content
    </v-timeline-item>

    <v-timeline-item>
      <template v-slot:opposite>
        Opposite
      </template>
      Content
    </v-timeline-item>
  </v-timeline>
          </VCol> -->
      </VRow>
    </VCol>
  </VRow>
</template>

<style>

/* Add any custom styling here */
.plus-icon {
  width: 48px;
  height: 48px;
  cursor: pointer;
}
.link-button {
  text-decoration: none;
  cursor: pointer;
}
.animate-shimmer {
  animation: shimmer 1s infinite linear;
  background-size: 200% 100%;
}

@keyframes shimmer {
  0% {
    background-position: -100% 0;
  }
  1% {
    background-position: 100% 0;
  }
}
</style>