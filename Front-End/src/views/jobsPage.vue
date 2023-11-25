<template>
   <v-data-table
     :headers="headers"
     :items="filteredJobs"
     :sort-by="[{ key: 'user_id', order: 'asc' }]"
   >
     <template v-slot:top>
       <v-toolbar flat>
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
             <v-btn color="primary" dark class="mb-2" v-bind="props">
               Add Job
             </v-btn>
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
         
       </v-toolbar>
     </template>
     <template v-slot:item.company_name="{ item }">
 <div>
  
 {{ getCompanyName(item.company_name) }}
 </div>
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
       <v-icon size="small" class="me-2" @click="editItem(item)">
         mdi-pencil
       </v-icon>
       <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
     </template>
     <template v-slot:no-data>
       <v-btn color="primary" @click="initialize"> Reset </v-btn>
     </template>
   </v-data-table>
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
    editedItem: {},
    dialog: false,
    dialogDelete: false,
    headers: [
       { title: "Title", key: "title" },
       { title: "Company", key: "company_name" },
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
       company_name: "",
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
       company_name: "",
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
  filteredJobs() {
    if (!this.search) {
      return this.jobs;
    }
    const query = this.search.toLowerCase();
    return this.jobs.filter(job => {
      return (
        job.title.toLowerCase().includes(query) ||
        job.company_name.toLowerCase().includes(query) ||
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
    initialize() {
      this.jobs = data;
    },
    editItem(item) {
      this.editedIndex = this.jobs.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
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
    return company.company_name;
  } else {
    return '';
  }
 },
  },
};
</script>
  