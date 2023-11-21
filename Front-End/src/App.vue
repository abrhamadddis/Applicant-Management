<template>
  <v-app class="grey lighten-4">
    <navBar />
    <router-view />
  </v-app>
</template>

<script setup>
  import navBar from '@/components/navBar.vue'
</script>
