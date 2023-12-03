<template>
    <v-data-table-virtual
      :headers="headers"
      :items="virtualBoats"
      height="400"
      item-value="firstName"
    ></v-data-table-virtual>
  </template>
  
  <script>
  import axios from 'axios';
  import { useAuthStore } from '../../store/auth'; // Import useAuthStore from your authentication store file
  
  export default {
    data() {
      return {
        headers: [
            {  title: "First Name", align: "start", key: "firstName", },
            { title: "Last Name",align: 'end', key: "lastName" },
            ],
        boats: [], // Empty initially, will be populated from the API
      };
    },
  
    computed: {
      virtualBoats() {
        // Use 'boats' data fetched from the API instead of the hardcoded values
        // return [...Array(this.boats.length).keys()].map((i) => {
        //   const boat = { ...this.boats[i % this.boats.length] };
        //   boat.firstName = `${boat.firstName} #${i}`;
        //   console.log(boat.firstName)
          return boats;
        // });
      },
    },
  
    mounted() {
      const authStore = useAuthStore(); // Get access to the auth store
      const token = authStore.token; // Get the token from the auth store
  
      // Fetch data from the API when the component is mounted using the token
      axios.get('http://localhost:8010/api/candidates', {
        headers: {
          Authorization: `Bearer ${token}`, // Set Authorization header with the token
        },
      })
        .then((response) => {
          // Assuming your API returns an array of boat objects
          this.boats = response.data;
          console.log("candidate in dashboard", this.boats)
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    },
  };
  </script>
  