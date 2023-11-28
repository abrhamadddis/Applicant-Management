<template>
  <!-- <div class="bg-lightGrey"> -->
    <div class="bg-lightGrey px-10  py-5">

    <v-data-table 
    class="my-5 mx-auto bg-white shadow-lg rounded-lg"
     :headers="headers"
     :items="filteredJobs"
     :sort-by="[{ key: 'user_id', order: 'asc' }]"
   >
     <template v-slot:top>
       <!-- <v-toolbar flat> -->
        <v-toolbar flat class="bg-grey-lighten-4 bg-shades-black rounded-lg">
        <!-- <v-toolbar flat class="bg-grey-lighten-4 rounded-lg"> -->
         <v-toolbar-title>Jobs</v-toolbar-title>
         <v-divider class="mx-4" inset vertical></v-divider>
         <v-spacer></v-spacer>
         <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          variant="underlined"
          single-line
          hide-details
        ></v-text-field>
         <v-dialog v-model="dialog" max-width="1000px">
           <template v-slot:activator="{ props }">
             <!-- <v-btn color="primary" dark class="mb-2" v-bind="props">
               Add Job
             </v-btn> -->
             <v-btn color="white" dark class=" my-5 mb-2" v-bind="props">
                    <v-icon left class="bg-white rounded-lg"> mdi-plus</v-icon> Add Job</v-btn> 
           </template>
           
           <v-card>
             <v-card-title>
               <span class="text-h5">{{ formTitle }}</span>
             </v-card-title>
             <v-card-text>
               <job-form :editedItem="editedItem"></job-form>
     </v-card-text>
             <!-- <v-card-text>
               <v-container>
                 <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.user_id"
                      label="User ID"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.title"
                      label="Title"
                    ></v-text-field>
                  </v-col>
                 </v-row>
               </v-container>
             </v-card-text> -->
  
             <v-card-actions>
               <v-spacer></v-spacer>
               <v-btn color="blue-darken-1" variant="text" @click="close">
                 Cancel
               </v-btn>
               <v-btn color="blue-darken-1" variant="text" @click="save">
                 Save
               </v-btn>
             </v-card-actions>
           </v-card>
         </v-dialog>
         <v-dialog v-model="dialogDelete" max-width="500px">
           <v-card>
             <v-card-title class="text-h5">
               Are you sure you want to delete this item?
             </v-card-title>
             <v-card-actions>
               <v-spacer></v-spacer>
               <v-btn color="blue-darken-1" variant="text" @click="closeDelete">
                 Cancel
               </v-btn>
               <v-btn
                 color="blue-darken-1"
                 variant="text"
                 @click="deleteItemConfirm"
               >
                 OK
               </v-btn>
               <v-spacer></v-spacer>
             </v-card-actions>
           </v-card>
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
                      <p>Title: {{ clickedItem.title }}</p>
                      <p>Company: {{ clickedItem.current_client }}</p>
                      <p>Location: {{ clickedItem.location }}</p>
                    </v-col>
                </v-row>
              </v-col>

              <v-col>
                  <p> Job Type: {{ clickedItem.job_type }}</p>
                  <p>Experience: {{ clickedItem.experience }}</p>
              </v-col>
              <v-col>
                  <v-row>
                     <p class="pl-2">Location: {{ clickedItem.location }}</p>
                  </v-row>
                  <v-row>
                    <p class="pl-2">Job summary{{ clickedItem.job_summary }}</p>
                  </v-row>
                  <v-row>
                    <p class="pl-2"> {{ clickedItem.responsibilities }}</p>
                  </v-row>
              </v-col>
             </v-row>
             <v-row>
                <v-col>
                  <!-- <v-chip :color="getStatusColor(clickedItem.status)" dark> -->
                    
                      <v-card-title class="px-4 ">
                        <h3 class="pb-10 h-12 pt-10">{{ clickedItem.responsibilities }}</h3>  
                      </v-card-title>
                    
                  <!-- </v-chip> -->
                  <!-- <v-card   class="pb-8 pt-2 px-2">
                    <p>Status</p>
                    <v-chip :color="getStatusColor(clickedItem.status)" dark>{{ clickedItem.status }}</v-chip>
                  </v-card> -->
                  <!-- <v-card class="my-2 px-2 py-2">
                    <p>CV: {{ clickedItem.cv }}</p>
                  </v-card> -->
                  <!-- <v-card class="my-2 px-2 py-2">
                    <p>Source: {{ clickedItem.source }}</p>
                  </v-card> -->
                </v-col>
                <v-col cols="9">
                  <v-card >
                    <p class="px-2 py-2">Job Summary: {{ clickedItem.job_summary }}</p>
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
     </template>
     <template v-slot:item.current_client="{ item }">
      <router-link :to="{ name: 'Candidates', params: { companyName: item.current_client } }">
    {{ getCompanyName(item.current_client) }}
  </router-link>
        <!-- <div>
   {{ getCompanyName(item.current_client) }}
 </div> -->
 </template>
     <template v-slot:item.requirements="{ item }">
 <div>
   <v-chip
     v-for="(requirement, index) in item.requirements"
     :key="index"
     :color="colorMap[requirement]"
     text-color="white"
   >
     {{ requirement }}
   </v-chip>
 </div>
 </template>
     <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="px-2" color="black lighten-3" @click="showItemInfo(item)"> mdi-eye </v-icon>
      <v-icon size="small" class="px-2" color="black lighten-3" @click="editItem(item)"> mdi-pencil</v-icon>
      <v-icon size="small" class="px-2" color="black lighten-3" @click="deleteItem(item)"> mdi-delete </v-icon>
     </template>
     <template v-slot:no-data>
       <v-btn color="primary" @click="initialize"> Reset </v-btn>
     </template>
   </v-data-table>
  </div>
  <!-- </div> -->
  </template>
  
  <script>
  import data from '../assets/tables/jobTable';
  import jobForm from './pages/jobForm.vue';
  import {store} from '../store/color';

  export default {
   components: {
     jobForm
   },
   data: () => ({
    search: '',
    // editedItem: {},
    dialog: false,
    dialogDelete: false,
    infoDialog: false,
    clickedItem: null,
    headers: [
       { title: "Title", key: "title" },
       { title: "Company", key: "current_client" },
       { title: "Location", key: "location" },
       { title: "Job Type", key: "job_type" },
       { title: "Experience", key: "experience" },
       { title: "Job Summary", key: "job_summary" },
       { title: "Responsibilities", key: "responsibilities" },
       { title: "Requirements", key: "requirements" },
       { title: "Actions", key: "actions", sortable: false },
     ],
     jobs: [],
     editedIndex: -1,
     editedItem: {
       user_id: "",
       title: "",
       current_client: "",
       location: "",
       job_type: "",
       experience: "",
       job_summary: "",
       responsibilities: "",
       requirements: [],
       is_active: false,
       created_by: "",
       updated_by: "",
       created_at: "",
       updated_at: "",
     },
     defaultItem: {
       user_id: "",
       title: "",
       current_client: "",
       location: "",
       job_type: "",
       experience: "",
       job_summary: "",
       responsibilities: "",
       requirements: [],
       is_active: false,
       created_by: "",
       updated_by: "",
       created_at: "",
      },
   }),
  computed: {
    companyName() {
  return this.$route.params.current_client;
 },
  filteredJobs() {
    if (!this.search) {
      return this.jobs;
    }
    const query = this.search.toLowerCase();
    return this.jobs.filter(job => {
      return (
        job.title.toLowerCase().includes(query) ||
        job.current_client.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.job_type.toLowerCase().includes(query) ||
        job.experience.toLowerCase().includes(query) ||
        job.job_summary.toLowerCase().includes(query) ||
        job.responsibilities.toLowerCase().includes(query) ||
        job.requirements.some(requirement =>
          requirement.toLowerCase().includes(query)
        )
      );
    });
  },
   colorMap() {
 const colorMap = store.state.colorMap;
 this.jobs.forEach(job => {
   if (Array.isArray(job.requirements)) {
     job.requirements.forEach(requirement => {
       if (!colorMap[requirement]) {
         colorMap[requirement] = this.randomColor();
       }
     });
   }
 });
 store.commit('setColorMap', colorMap);
 return colorMap;
 },
    formTitle() {
      return this.editedIndex === -1 ? "New Job" : "Edit Job";
    },
 requirementsArray() {
  return Object.values(this.requirements);
},

  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    goToCandidates(current_client) {
    this.$router.push({ name: 'Candidates', params: { companyName: current_client } });
  },
    initialize() {
      this.jobs = data;
    },
    editItem(item) {
      this.editedIndex = this.jobs.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    showItemInfo(item) {
  this.clickedItem = item;
  this.infoDialog = true;
},
    deleteItem(item) {
      this.editedIndex = this.jobs.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.jobs.splice(this.editedIndex, 1);
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
      if (this.editedIndex > -1) {
        Object.assign(this.jobs[this.editedIndex], this.editedItem);
      } else {
        this.jobs.push(this.editedItem);
      }
      this.close();
    },
    randomColor() {
   const letters = '0123456789ABCDEF';
   let color = '#';
   for (let i = 0; i < 6; i++) {
     color += letters[Math.floor(Math.random() * 16)];
   }
   return color;
 },
 getCompanyName(company) {
  if (typeof company === 'string') {
    return company;
  } else if (typeof company === 'object' && company !== null) {
    return company.current_client;
  } else {
    return '';
  }
 },
  },
};
</script>
  
<style>
.bg-lightGrey {
  background-color: #f5f5f5; /* Or any light grey color you prefer */
  padding-left: 10px;
  padding-right: 10px;
}
</style>
