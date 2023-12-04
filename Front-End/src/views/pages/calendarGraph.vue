<script setup>
import { ref, computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const currentTab = ref('3Days')

const series = {
 '3Days': [{
  data: [
    // number of candidates for 3 days
    24,
    12,
    20
  ],
 }],
 '7Days': [{
  data: [
    // number of candidates for 7 days
    24,
    32,
    21,
    30,
    25,
    20,
    22
  ],
 }],
 '10Days': [{
  data: [
    // number of candidates for 10 days
    24,
    21,
    30,
    22,
    40,
    26,
    35,
    35,
    20,
    23
  ],
 }],
}

const chartConfig = computed(() => ({
 chart: {
  type: 'area',
  toolbar: { show: false },
 },
 dataLabels: { enabled: false },
 stroke: {
  width: 3,
  curve: 'smooth',
 },
 xaxis: {
  categories: [
    'Day 1',
    'Day 2',
    'Day 3',
    'Day 4',
    'Day 5',
    'Day 6',
    'Day 7',
    'Day 8',
    'Day 9',
    'Day 10',
  ],
 },
 yaxis: {
  min: 5,
  max: 40,
  show: false,
  tickAmount: 4,
 },
 colors: ['#FF694B'], // Set the desired color (orange) for the area chart
}))
</script>

<template>
  <div>
    <div>
        <div class="font-bold text-xl mb-3 my-3 text-gray-800">Interview schedule</div>
    </div>
    <div>
      <v-hover
        v-slot="{ isHovering, props }"
        open-delay="200"
      >
        <button @click="currentTab = '3Days'" :elevation="isHovering ? 16 : 2"
          :class="{ 'on-hover': isHovering }"
          class="mx-auto"
          height="350"
          max-width="350"
          v-bind="props"
        >
          3 Days
        </button>
        <button @click="currentTab = '7Days'" class="m-2 p-2 text-black bg-deep-orange-lighten-5 rounded hover:bg-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 shadow-md">
          7 Days
        </button>
        <button @click="currentTab = '10Days'" class="m-2 p-2 text-black bg-deep-orange-lighten-5 rounded hover:bg-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 shadow-md">
          10 Days
        </button>
      </v-hover>
   
      <VueApexCharts
        type="area"
        :options="chartConfig"
        :series="series[currentTab]"
        height="300px"
      />
    </div>
  </div>
</template>

<style scoped>
.v-card:not(.on-hover) {
  background-color: rgba(#94d300, 0.8)
}
</style>