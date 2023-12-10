<template>
  <v-app class="grey lighten-4">
    <navBar v-if="isAuthenticated" />
    <RouterView />
  </v-app>
</template>

<script>
import navBar from '@/components/navBar.vue';
import { useAuthStore } from '@/store/auth'; // Import your Pinia store
import { computed } from 'vue';

export default {
  components: {
    navBar,
  },
  setup() {
    const authStore = useAuthStore(); // Access the Pinia store

    const isAuthenticated = computed(() => authStore.token !== '');

    return {
      isAuthenticated,
    };
  },
};
</script>
