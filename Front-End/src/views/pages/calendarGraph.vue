<template>
  <div>
    <div class="font-bold text-xl mb-3 my-3 text-gray-800">Interview schedule</div>
    <div>
      <v-hover
        v-slot="{ isHovering, props }"
        open-delay="200"
      >
        <!-- Buttons for different time spans -->
        <button @click="currentTab = '3Days'" :elevation="isHovering ? 16 : 2" :class="{ 'on-hover': isHovering }" class="mx-auto" height="350" max-width="350" v-bind="props">
          3 Days
        </button>
        <button @click="currentTab = '7Days'" class="m-2 p-2 text-black bg-deep-orange-lighten-5 rounded hover:bg-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 shadow-md">
          7 Days
        </button>
        <button @click="currentTab = '10Days'" class="m-2 p-2 text-black bg-deep-orange-lighten-5 rounded hover:bg-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 shadow-md">
          10 Days
        </button>
      </v-hover>
      
      <!-- VueApexCharts component -->
      <VueApexCharts
        type="bar"
        :options="chartConfig"
        :series="series[currentTab]"
        height="300px"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const currentTab = ref('3Days');

// Define series data for different time spans
const series = {
  '3Days': [{ data: [24, 12, 20] }],
  '7Days': [{ data: [24, 12, 20, 30, 25, 20, 22] }],
  '10Days': [{ data: [24, 12, 20, 22, 40, 26, 35, 35, 20, 23] }],
};

// Define chart configuration based on ApexCharts options
const chartConfig = computed(() => ({
  series: series['3Days'],
  chart: {
    height: 350,
    type: 'bar',
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      dataLabels: {
        position: 'top',
      },
      columnWidth: '35%', // Adjust the column width as needed
      colors: {
        ranges: [{
        from: 0,
        to: 10,
        color: '#FFD6D5', // Light pink for 0-10
      }, {
        from: 10,
        to: 20,
        color: '#FFC2C4', // Light pink-red for 10-20
      }, {
        from: 20,
        to: 30,
        color: '#FF8C94', // Bright pink for 20-30
      },{
        from: 30,
        to: 40,
        color: '#FF698B', // Orange color for 20-30
      }],
    },

    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return val;
    },
    offsetY: -20,
    style: {
      fontSize: '12px',
      colors: ['#FF694B'],
    },
  },
  xaxis: {
    categories: ['Day 1', 'Day 2', 'Day 3'], // Update with your categories
    position: 'bottom',
    axisBorder: { show: false },
    axisTicks: { show: false },
    crosshairs: {
      fill: {
        type: 'gradient',
        gradient: {
          colorFrom: '#D8E3F0',
          colorTo: '#BED1E6',
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5,
        },
      },
    },
    tooltip: { enabled: true },
  },
  yaxis: {
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: {
      show: false,
      formatter: function (val) {
        return val;
      },
    },
  },
  title: {
    text: 'Interview Schedule',
    floating: true,
    offsetY: 330,
    align: 'center',
    style: { color: '#444' },
  },
}));

</script>

<style scoped>
.v-card:not(.on-hover) {
  background-color: rgba(#94d300, 0.8);
}
</style>
