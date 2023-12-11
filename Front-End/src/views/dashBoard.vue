<script setup>
import statusBoard from '@/views/pages/statusBoard.vue'
import CardStatisticsVertical from '../@core/components/cards/CardStatisticsVertical.vue'
import CalendarGraph from '@/views/pages/calendarGraph.vue'
import CalendarView from '@/views/pages/calendarView.vue'
// 👉 Images
import jobsicon from '../assets/jobs.png'
import appliedCandidates from '../assets/appliedCandidates.png'
import outdatedJobs from '../assets/outdatedJobs.png'
import candidatesicon from '../assets/searchJob.png'
import { useRouter } from 'vue-router';
// import datatable from '../assets/tables/dataTable';
// import jobtable from '../assets/tables/jobTable';
import axios from "axios";
import { useAuthStore } from '../store/auth';
import candidatesDashboard from './pages/candidatesDashboard.vue';

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
      candidates: [], // Assuming datatable.js exports an object with a candidates property
      jobs: [],
    };
  },

 
  methods: {
    async fetchJobs() {
      try {
        const authStore = useAuthStore(); // Get access to the auth store
        const token = authStore.token; // Get the token from the auth store

        const res = await axios.get('http://localhost:8010/api/jobs', {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        });

        this.jobs = res.data;
        return this.jobs.length;
      } catch (err) {
        console.error(err);
      }
    },

    // async fetchCandidates(){
    //   try{

    //     const res= await fetch('http://localhost:8010/api/candidates');
    //     const data =await res.json();
    //     this.candidates=data;
    //     console.log(this.candidates);
    //     return this.candidates.length;
    //   } catch (err){
    //     console.log(err)
    //   }
    // }

    async fetchCandidates() {
      try {
        const authStore = useAuthStore(); // Get access to the auth store
        const token = authStore.token; // Get the token from the auth store

        const res = await axios.get('http://localhost:8010/api/candidates', {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        });

        this.candidates = res.data;
        return this.candidates.length;
      } catch (err) {
        console.error(err);
      }
    },
    // fetchCandidates() {
    //   // Access the number of candidates from the datatable.js file
    //   return this.data.length; // Access the length of the array

    // },
    // fetchJobs() {
    //   return this.jobs.length;
    // }
  },
  mounted(){
    this.fetchJobs();
    this.fetchCandidates();
  }
};
</script>

<template>
  <VRow
  class="mx-6 my-6" >
  <!-- 👉 status board -->
  
  <VRow 
  cols="12"
  sm="12" >
  <div class="pa-6 pb-0">
    <div class="text-subtitle-1">Welcome,  </div>
      <div class="text-h6 text-md-h5 text-lg-h5 py-2">Instant start with these suggestions</div>
    </div>
    </VRow>


  <VRow
  cols="12"
  sm="12">
    <!-- 👉 new opening -->
    <!-- <VCol
    cols="3"
    md="3"
    >
    
  <div class="bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300">
    <div class="h-1 bg-primary"></div>
    <div class="px-6 py-2">
      <div class="font-bold text-l mb-2 text-gray-800 text-center">Latest Candidates</div>
    </div>
    <div class="flex justify-center py-2">
      <button @click.prevent="goToCandidatePage" class="bg-blue-500 text-white rounded-full p-2 transition duration-300 transform hover:scale-110 shadow-md">
 view all
      </button>
    </div>
  </div>

        </VCol> -->
<VCol
   cols="8"
   md="8">
   <VRow>

   <VCol
   cols="4"
   md="4">
        
      <div class="bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300">
      <div class="h-1 bg-secondary"></div>
      <div class="px-6 py-2">
      <div class="font-bold text-l mb-2 text-gray-800 text-center">New Openings</div>
      </div>
      <div class="flex justify-center py-2">
        <button @click.prevent="goToJobPage" class="bg-primary rounded-full p-2 transition duration-300 transform hover:scale-110 shadow-md">
        <v-icon class="text-3xl text-white">mdi-plus</v-icon>
        </button>
      </div>
      </div>
  </VCol>
       
        <!-- 👉 add candidates -->
  <VCol
     cols="4"
     md="4"
  >
       <div class="bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300">
      <div class="h-1 bg-secondary"></div>
      <div class="px-6 py-2">
      <div class="font-bold text-l mb-2 text-gray-800 text-center">Add Candidates</div>
      </div>
      <div class="flex justify-center py-2">
      <button @click.prevent="goToCandidatePage" class="bg-primary rounded-full p-2 transition duration-300 transform hover:scale-110 shadow-md">
        <v-icon class="text-3xl text-white">mdi-plus</v-icon>
      </button>
      </div>
      </div>
  </VCol>
  </VRow>

  <VRow>

  <div class="pa-6 pb-0 text-lg-h5 "> Statistic</div>
  <VCol

cols="12"
md="12"
>
<statusBoard />
</VCol>
</VRow>
</VCol>

  <VCol
    cols="3"
    sm="3">
    <div class="px-6 py-2">
      <div class="font-bold text-l mb-2 text-gray-800 text-center">Latest Candidates
      <button @click.prevent="goToCandidatePage" class="text-primary  p-2 transition duration-300 transform hover:scale-110 ">
        view all
      </button>
      </div>
      </div>
      <candidatesDashboard/>
  </VCol>
  <VCol
    cols="12"
    sm="12">
    <div class="px-6 py-2">
      <div class="font-bold text-l mb-2 text-gray-800 text-center">Latest Candidates
      <button @click.prevent="goToCandidatePage" class="text-primary  p-2 transition duration-300 transform hover:scale-110 ">
        view all
      </button>
      </div>
      </div>
      <CalendarView ref="calendar" />
  </VCol>
 </VRow>
  
    <VCol
      cols="12"
      sm="12" class="mt-11"
    >
   
      <VRow>
        <VCol
          cols="6"
          md="3"
        >
          <CardStatisticsVertical
            v-bind="{
              title: 'Number of Jobs currently',
              image: jobsicon,
              stats: jobs.length,
            }"
          />
        </VCol>
        
        <!-- 👉 Achieved / Applied candidates -->
        <VCol
          cols="6"
          md="3"
        >
          <CardStatisticsVertical
            v-bind="{
              title: 'Achieved / Applied candidates',
              image: appliedCandidates,
              stats: candidates.filter(candidate => candidate.status === Offered).length,
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
              image: candidatesicon,
              stats: candidates.length,
              // change: 12,
            }"
          />
        </VCol>
        <VCol
          cols="6"
          md="3"
        >
          <CardStatisticsVertical
            v-bind="{
              title: 'Out Dated Jobs',
              image: outdatedJobs,
              stats: jobs.filter(job => job.is_active === false).length,
            }"
          />
        </VCol> 
        
   
        <VRow>
      <VCol
      cols="12"
      md="12">
      <VCol
      cols="12"
      md="12"
    >
      <CalendarGraph />
    </VCol>
      </VCol>
    </VRow>
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