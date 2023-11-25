<script setup>
import statusBoard from '@/views/pages/statusBoard.vue'
// import AnalyticsCongratulations from '@/views/dashboard/AnalyticsCongratulations.vue'
// import AnalyticsFinanceTabs from '@/views/dashboard/AnalyticsFinanceTab.vue'
// import AnalyticsOrderStatistics from '@/views/dashboard/AnalyticsOrderStatistics.vue'
// import AnalyticsTotalRevenue from '@/views/dashboard/AnalyticsTotalRevenue.vue'
import CardStatisticsVertical from '../@core/components/cards/CardStatisticsVertical.vue'
// import Cards from '@/views/dashboard/Cardss.vue'
// 👉 Images
import chart from '../assets/chart-success.png'
import wallet from '../assets/wallet-info.png'
</script>

<template>
  <VRow>
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
          <CardStatisticsVertical
            v-bind="{
              title: '  New    __  Openings  ',
              image: chart,
            }"
          />
        </VCol>

        <!-- 👉 Sales -->
        <VCol
          cols="12"
          md="6"
        >
          <CardStatisticsVertical
            v-bind="{
              title: 'Add Candidates',
              image: wallet,

            }"
          />
        </VCol>
      </VRow>
    </VCol>

    <!-- 👉 Total Revenue -->
    <VCol
      cols="12"
      md="8"
      order="2"
      order-md="1"
    >
      <AnalyticsTotalRevenue />
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
              stats: getCandidateCount(),
            }"
          />
        </VCol>
          <!-- 👉 Tabs chart -->
    <VCol
      cols="12"
      md="12"
      sm="12"
      order="3"
    >
      <AnalyticsFinanceTabs />
    </VCol>
    <VCol
      cols="12"
      md="4"
      sm="6"
      order="3"
    >
      <AnalyticsOrderStatistics />
    </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
<script>
import datatable from '../assets/tables/dataTable';

export default {
  data() {
    return {
      // chart: 'path/to/chart.png',
      data: datatable, // Assuming datatable.js exports an object with a candidates property
    };
  },
  methods: {
    getCandidateCount() {
      // Access the number of candidates from the datatable.js file
      return this.data.length; // Access the length of the array

    },
  },
};
</script>