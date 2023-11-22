<template>
  
  <v-app class="grey lighten-4">
    <navBar />
    <RouterView />
  </v-app>
</template>

<script setup>
  import navBar from '@/components/navBar.vue'
</script>
