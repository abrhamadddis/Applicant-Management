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
    42,
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
  min: 10,
  max: 50,
  show: false,
  tickAmount: 4,
 },
}))
</script>

<template>
    <div>
    <div>
        <div class="font-bold text-xl mb-3 my-3 text-gray-800">Interview schedule</div>
    </div>
    <div>
    <button @click="currentTab = '3Days'" class="m-2 p-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 shadow-md">3 Days</button>
    <button @click="currentTab = '7Days'" class="m-2 p-2 text-black bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 shadow-md">7 Days</button>
    <button @click="currentTab = '10Days'" class="m-2 p-2 text-black bg-green-500 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 shadow-md">10 Days</button>
   
    <VueApexCharts
    type="area"
    :options="chartConfig"
    :series="series[currentTab]"
    height="300px"
    />
    </div>
    </div>
   </template>
   
