<template>
    <nav>
      <v-toolbar flat app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <span class="font-weight-light">MMCY</span>
          <span>Tech</span>
        </v-toolbar-title>
        <v-btn flat color="company" v-if="isAuthenticated" @click="logout">
          <span>sign out</span>
          <v-icon right>exit_to_app</v-icon>
        </v-btn>
        <v-btn flat color="company" v-if="!isAuthenticated">
          <span>sign in</span>
          <v-icon right>exit_to_app</v-icon>
        </v-btn>
      </v-toolbar>
      <v-navigation-drawer temporary v-model="drawer"  class="indigo">
        <v-list>
          <br>
          <v-list-item class="d-flex justify-start pl-5 pt-15 " router :to="'/'">
              <v-list-title-action class="pr-5">
                  <v-icon><svg width="30px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="grid-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-grid-2 fa-lg"><path fill="currentColor" d="M224 80c0-26.5-21.5-48-48-48H80C53.5 32 32 53.5 32 80v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V80zm0 256c0-26.5-21.5-48-48-48H80c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V336zM288 80v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48H336c-26.5 0-48 21.5-48 48zM480 336c0-26.5-21.5-48-48-48H336c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V336z" class=""></path></svg></v-icon>
              </v-list-title-action>
              <v-list-title-content>
                  <v-list-title-title>DashBoard</v-list-title-title>
              </v-list-title-content>
          </v-list-item>
          <v-list-item class="d-flex justify-start pl-5 pt-5 " router :to="'/jobs'">
              <v-list-title-action class="pr-5">
                  <v-icon><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M88.7 223.8L0 375.8V96C0 60.7 28.7 32 64 32H181.5c17 0 33.3 6.7 45.3 18.7l26.5 26.5c12 12 28.3 18.7 45.3 18.7H416c35.3 0 64 28.7 64 64v32H144c-22.8 0-43.8 12.1-55.3 31.8zm27.6 16.1C122.1 230 132.6 224 144 224H544c11.5 0 22 6.1 27.7 16.1s5.7 22.2-.1 32.1l-112 192C453.9 474 443.4 480 432 480H32c-11.5 0-22-6.1-27.7-16.1s-5.7-22.2 .1-32.1l112-192z"/></svg></v-icon>
              </v-list-title-action>
              <v-list-title-content>
                  <v-list-title-title>Jobs</v-list-title-title>
              </v-list-title-content>
          </v-list-item>
          <v-list-item class="d-flex justify-start pl-5 pt-5 " router :to="'/candidates'">
              <v-list-title-action class="pr-5">
                  <v-icon><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/></svg></v-icon>
              </v-list-title-action>
              <v-list-title-content>
                  <v-list-title-title>Candidates</v-list-title-title>
              </v-list-title-content>
          </v-list-item>
          <v-list-item class="d-flex justify-start pl-5 pt-5 " router :to="'/users'">
              <v-list-title-action class="pr-5">
                  <v-icon><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg></v-icon>
              </v-list-title-action>
              <v-list-title-content>
                  <v-list-title-title>Users</v-list-title-title>
              </v-list-title-content>
          </v-list-item>
          
        </v-list>
      </v-navigation-drawer>
    </nav>
  </template>
<script>
import { defineComponent } from 'vue';
import { useAuthStore } from '@/store/auth';

  export default defineComponent ({
    computed: {
    isAuthenticated() {
      return useAuthStore().token !== '';
    },
    isAdminOrSuperAdmin() {
      const role = useAuthStore().role;
      return role === 'admin' || role === 'superadmin';
    },
    isSuperAdmin() {
      return useAuthStore().role === 'superadmin';
    },
    },
    methods: {
        logout() {
        const authStore = useAuthStore();
        authStore.clearToken();
        this.$router.push('/');
      },
    },
    data() {
      return {
        drawer: false,
        
      };
    },
    components:{
  
    }
  });
  </script>
  