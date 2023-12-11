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
            {  title: "Name", align: "start", key: "firstName", },
            { title: "Status",align: 'end', key: "status" },
            ],
        boats: [], // Empty initially, will be populated from the API
      };
    },
    computed: {
    // Assuming boats are sorted by 'year' property in descending order
    sortedCandidates() {
      return this.boats.sort((a, b) => a.year - b.year);
    },
  },
    computed: {
      virtualBoats() {
        return this.boats.map((boat, i) => {
      return {
        ...boat,
        firstName: `${boat.first_name} ${boat.last_name}`,
        // Assuming 'lastName' property exists in the boat object from the API
        // If not, replace 'lastName' with the correct property name
        lastName: boat.status,
      };
    });
      },
    },
    methods: {
    showLatestCandidates() {
      // Displaying the top 10 latest candidates, adjust as needed
      this.latestCandidates = this.sortedCandidates.slice(0, 10);
    },
  },
    mounted() {
      const authStore = useAuthStore(); // Get access to the auth store
      const token = authStore.token; // Get the token from the auth store
  
      // Fetch data from the API when the component is mounted using the token
      axios.get('http://localhost:8010/api/candidates?limit=50&sort=createdAt', {
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
  