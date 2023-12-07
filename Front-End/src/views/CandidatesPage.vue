<template>
    <div class="bg-lightGrey px-10  py-5">
        <v-container fluid>
          <v-row justify="center">
            <v-col cols="12" class="text-center">
              <v-toolbar-title>Candidates for {{ $route.params.companyName }}</v-toolbar-title>
            </v-col>
          </v-row>
        </v-container>
      <v-data-table 
      class="my-5 mx-auto bg-white shadow-lg rounded-lg"
        :headers="headers"
        :items="filteredCandidates"
        :sort-by="[{ key: 'first_name', order: 'asc' }]"
        v-if="!loading && filteredCandidates.length"
      >
        <template v-slot:top>
        <div>
            <v-toolbar flat class="bg-grey-lighten-4 bg-shades-black rounded-lg">
            <v-divider class="" inset vertical></v-divider>
            <v-text-field
            v-model="search"
            prepend-icon="mdi-magnify"
            label="Search"
            variant="underlined"
            single-line
            hide-details
            ></v-text-field>
            <v-spacer></v-spacer>

            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ props }">
                <v-btn color="white" dark class=" my-5 mb-2" v-bind="props">
                    <v-icon left class="bg-white rounded-lg"> mdi-plus</v-icon> Add Candidate
                </v-btn> 
              </template>

              <!-- Add candidate dialog goes here -->
              <!-- Add candidate dialog -->
                <v-dialog v-model="dialog" max-width="1000px">
                <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.first_name" label="First Name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.last_name" label="Last Name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.phone_number" label="Phone Number"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.location" label="Location"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.status" label="Status"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.company" label="Company"></v-text-field>
                        </v-col>
                    </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
                </v-card>
                </v-dialog>

            </v-dialog>
            <v-dialog v-model="infoDialog" max-width="1100px" >
          <template v-slot:activator="{ props }">
          </template>
          <v-card class="px-8 py-8">
            <v-card-title>
              <span class="text-h5">Candidate Profile</span>
            </v-card-title>
            <v-col>
              <v-row >
                <v-col cols="3">
                      <v-row>
                        <svg xmlns="http://www.w3.org/2000/svg" height="5rem" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                        <v-col>
                      <p>First Name: {{ clickedItem.first_name }}</p>
                      <p>Last Name: {{ clickedItem.last_name }}</p>
                      <p>Foreign Name: {{ clickedItem.foreignName }}</p>
                    </v-col>
                </v-row>
              </v-col>

              <v-col>
                  <p> Applied For: {{ clickedItem.position }}</p>
                  <p>Desired salary: 500</p>
                  <p>Current Client: {{ clickedItem.company }}</p>
              </v-col>
              <v-col>
                  <v-row>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
                    <p class="pl-2">{{ clickedItem.location }}</p>
                  </v-row>
                  <v-row>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
                    <p class="pl-2">{{ clickedItem.email }}</p>
                  </v-row>
                  <v-row>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>
                    <p class="pl-2"> {{ clickedItem.phone_number }}</p>
                  </v-row>
              </v-col>
             </v-row>
             <v-row>
                <v-col>
                  <!-- <v-chip :color="getStatusColor(clickedItem.status)" dark> -->
                    
                      <v-card-title class="px-4 ">
                        <h3 class="pb-10 h-12 pt-10">{{ clickedItem.status }}</h3>  
                      </v-card-title>
                    
                  <!-- </v-chip> -->
                  <!-- <v-card   class="pb-8 pt-2 px-2">
                    <p>Status</p>
                    <v-chip :color="getStatusColor(clickedItem.status)" dark>{{ clickedItem.status }}</v-chip>
                  </v-card> -->
                  <v-card class="my-2 px-2 py-2">
                    <p>CV: {{ clickedItem.cv }}</p>
                  </v-card>
                  <v-card class="my-2 px-2 py-2">
                    <p>Source: {{ clickedItem.source }}</p>
                  </v-card>
                </v-col>
                <v-col cols="9">
                  <v-card >
                    <p class="px-2 py-2">Overall Feedback: {{ clickedItem.overAllFeedBack }}</p>
                  </v-card>
              </v-col>
              </v-row>
            </v-col>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="infoDialog = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
          </v-toolbar>
        </div>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon size="small" class="px-2" color="black lighten-3" @click="showItemInfo(item)"> mdi-eye </v-icon>
          <v-icon size="small" class="px-2" color="black lighten-3" @click="editItem(item)"> mdi-pencil </v-icon>
          <v-icon size="small" class="px-2" color="black lighten-3" @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>
      <div v-else-if="!loading">No candidates found for {{ $route.params.companyName }}</div>
      <div v-else>Loading candidates...</div>
    </div>
   </template>
   
   <script>
  //  import candidateData from "../assets/tables/candidateTable";
   import axios from "axios";


   export default {
    data() {
      return {
        search: '',
        candidates: [],
        loading: true,
            dialog: false,
    dialogDelete: false,
    infoDialog: false,
    clickedItem: null,
        headers: [
            {
            title: "First Name",
            align: "start",
            sortable: true,
            key: "first_name",
            },
          { title: "Last Name",text: 'Last Name', key: "last_name", value: 'last_name' },
          { title: "Email",text: 'Email',  key: "email", value: 'email' },
          { title: "Phone Number",text: 'Phone Number',  key: "phone_number",value: 'phone_number' },
          { title: "Location",text: 'Location', key: "location", value: 'location' },
          { title: "Status",text: 'Status',  key: "status", value: 'status' },
          { title: "Company",text: 'Company',  key: "company", value: 'company' },
          { title: "Action",text: 'Actions',  key: "actions", value: 'actions', sortable: false },
        ],
        dialog: false,
        editedIndex: -1,
        editedItem: {
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          location: "",
          status: "",
          company: "",
        },
        defaultItem: {
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          location: "",
          status: "",
          company: "",
        },
      };
    },
    computed: {
  filteredCandidates() {
    console.log('Search:', this.search);
    console.log('Company Name:', this.$route.params.companyName);

    if (!this.search && this.$route.params.companyName !== undefined && this.$route.params.companyName !== '') {
      const filtered = this.candidates.filter(candidate => candidate.company === this.$route.params.companyName);
      console.log('Filtered by Company:', filtered);
      return filtered;
    } else if (!this.search) {
      console.log('All Candidates:', this.candidates);
      return this.candidates; // Return all candidates when no search and no company filter is provided
    }

    const query = this.search.toLowerCase();
    const filteredBySearch = this.candidates.filter(candidate => {
      // Filter based on search query
      return (
        candidate.first_name.toLowerCase().includes(query) ||
        candidate.last_name.toLowerCase().includes(query) ||
        candidate.email.toLowerCase().includes(query) ||
        candidate.phone_number.toLowerCase().includes(query) ||
        candidate.location.toLowerCase().includes(query) ||
        candidate.status.toLowerCase().includes(query) ||
        candidate.company.toLowerCase().includes(query)
      );
    });
    console.log('Filtered by Search:', filteredBySearch);
    return filteredBySearch;
  },
},


   async created() {
      // Replace this with the imported data
      // this.candidates = candidateData;
      // async created() {
        const token = localStorage.getItem('token');

if (!token) {
  this.$router.push('/login');
  return; // Exit early if there's no token
}

const config = {
  headers: {
    'Authorization': `Bearer ${token}`
  }
};

try {
  const response = await axios.get('http://localhost:8010/api/candidates/', config);
  this.candidates = response.data;
} catch (error) {
  console.error(error);
  this.showErrorToUser('Failed to fetch candidates. Please try again.'); // Show error to the user
}
      // Simulating a delay for data loading
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    methods: {
      editItem(item) {
        this.editedIndex = this.candidates.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },
      showItemInfo(item) {
  this.clickedItem = item;
  this.infoDialog = true;
},

      deleteItem(item) {
        this.editedIndex = this.candidates.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogDelete = true;
      },
      deleteItemConfirm() {
        this.candidates.splice(this.editedIndex, 1);
        this.closeDelete();
      },
      close() {
        this.dialog = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },
      closeDelete() {
        this.dialogDelete = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },

      save() {
    // Populate the company field with the route parameter value
    this.editedItem.company = this.$route.params.companyName;

    if (this.editedIndex > -1) {
      Object.assign(this.candidates[this.editedIndex], this.editedItem);
    } else {
      this.candidates.push(this.editedItem);
    }
    this.close();
  },
    },
   };
   </script>
   












   