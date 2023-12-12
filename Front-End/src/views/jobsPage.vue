<template>
  <!-- <div class="bg-lightGrey"> -->
    <div class="bg-lightGrey px-10  py-5">

    <v-data-table 
    class="my-5 mx-auto bg-white hover:bg-gray-200 shadow-lg rounded-lg"
     :headers="headers"
     :items="filteredJobs"
     :loading="isLoading"
    loading-text="Loading... Please wait"
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
                    <v-icon left class="bg-primary rounded-lg mx-2"> mdi-plus</v-icon>  Add Job</v-btn> 
           </template>
           
           <v-card>
             <v-card-title>
               <span class="text-h5">{{ formTitle }}</span>
             </v-card-title>
             <!-- <v-card-text>
               <job-form :editedItem="editedItem"></job-form>
              </v-card-text> -->
              <v-card-text>
                <!-- <job-form :editedItem="editedItem" :editedIndex="editedIndex" @job-updated="jobUpdated" @job-created="jobCreated" @job-deleted="jobDeleted"></job-form> -->

                <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="editedItem.title"
          variant="underlined"
          label="Title"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="editedItem.company"
          variant="underlined"
          label="Company"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-checkbox
          v-model="editedItem.new"
          variant="underlined"
          label="new"
        ></v-checkbox>
      </v-col>
      <v-col cols="12" md="6">
        <v-checkbox
          v-model="editedItem.featured"
          variant="underlined"
          label="Featured"
        ></v-checkbox>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="editedItem.location"
          variant="underlined"
          label="Location"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="editedItem.job_type"
          variant="underlined"
          label="Job Type"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="editedItem.experience"
          variant="underlined"
          label="Experience"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-textarea
          v-model="editedItem.job_summary"
          variant="underlined"
          label="Job Summary"
        ></v-textarea>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="editedItem.responsibilities"
          variant="underlined"
          label="Responsibilities"
        ></v-text-field>
      </v-col>
      
    
          <v-col cols="12" md="6">
        <v-checkbox
          v-model="editedItem.is_active"
          variant="underlined"
          label="Is Active"
        ></v-checkbox>
      </v-col>
      
      <!-- <v-col cols="12">
        <v-combobox
          v-model="editedItem.skills"
          :items="skills"
          label="skills"
          multiple
          chips
        ></v-combobox>
      </v-col> -->
      <v-combobox
        v-model="editedItem.skills"
        :items="skills"
        label="skills"
        variant="underlined"
        multiple
        chips
      >
 <template v-slot:selection="data">
   <v-chip
     :selected="data.selected"
     close
     @input="data.parent.selectItem(data.item)"
   >
     {{ data.item }}
   </v-chip>
 </template>
</v-combobox>
<v-col cols="12" md="6">
        <!-- <v-text-field
          variant="underlined"
          label="Responsibilities"
          >
          <Datepicker v-model="picked" />
        </v-text-field> -->
        <div>
          Job End Date:
        </div>
        <Datepicker v-model="picked" class="custom-datepicker" ></Datepicker>
       
        <!-- <v-date-picker v-model="picked" class="custom-datepicker"></v-date-picker> -->
        </v-col>  
</v-row>
</v-container>

              </v-card-text>
             
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
    <v-card class="delete-confirmation-modal">
      <v-card-title class="text-h5">
        Are you sure you want to delete this item?
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="closeDelete">
          Cancel
        </v-btn>
        <v-btn color="error" text @click="deleteItemConfirm">
          OK
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="infoDialog" max-width="1000px">
    <template v-slot:activator="{ props }">
      <!-- Activator slot content here -->
    </template>

    <v-card class="job-profile-card ">
      <v-card-title class="d-flex bg-grey-lighten-3 justify-space-between align-center">
        <v-img
          height="200"
          src="https://talent.mmcytech.com/wp-content/uploads/2021/09/MMCY-Tech-Job_section-1.png"
          cover
          class="text-white"
        >
          <v-toolbar
            color="rgba(0, 0, 0, 0)"
            theme="dark"
          >
            <template v-slot:prepend>
              <v-btn icon="$menu"></v-btn>
            </template>

            <v-toolbar-title class="text-h6">
              Job Profile
            </v-toolbar-title>

            <template v-slot:append>
              <v-btn icon @click="infoDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-btn icon="mdi-dots-vertical"></v-btn>
            </template>
          </v-toolbar>
        </v-img>
        <!-- <span class="text-h5">Job Profile</span> -->
      </v-card-title>
      <v-card-text>
        <v-row>
          <!-- First Column - Company Details -->
          <v-col cols="4">
            <v-card class="company-details mt-n16 bg-transparent rounded-lg">
          <v-avatar size="150" class="floating-avatar " color="#FF694B">
                 <svg xmlns="http://www.w3.org/2000/svg" height="5rem" viewBox="0 0 448 512">
                  <path fill="#FF694B" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                </svg>
              </v-avatar>
              <div class="company-info flex flex-column">
                <span class="font-weight-bold"><v-icon class="text-primary mr-1" icon="mdi-domain" />{{ clickedItem.company }}</span>
                <span><v-icon class="text-primary mr-1" icon="mdi-map-marker" />{{ clickedItem.location }}</span>
                <span><v-icon class="text-primary mr-1" icon="mdi-briefcase" />{{ clickedItem.job_type }}</span>
                <span><v-icon class="text-primary mr-1" icon="mdi-account-tie" />{{ clickedItem.experience }}</span>
              </div>
            </v-card>
          </v-col>
          
          <!-- Second Column - Job Details -->
          <v-col cols="8">
            <v-card class="job-details">
              <v-card-text>
                <span class="font-weight-bold text-primary text-lg text-center" style="font-size: 24px; font-family: 'Fancy Card Text', cursive;">
 {{ clickedItem.title }}
</span>

                  <div></div>
                  <span class="text-subtitle-1" style="font-family: 'Fancy Card Text', cursive;">
 Job Summary
</span>
<p class="text-subtitle-1" style="font-family: 'Fancy Card Text', cursive;">
 {{ clickedItem.job_summary }}
</p>

                <span color="#FF694B">Responsibilities</span>
                <p class="mx-10">{{ clickedItem.responsibilities }}</p>

                <span color="#FF694B">Skills</span>
                <v-chip-group>
                  <v-chip v-for="(skill, index) in clickedItem.skills" :key="index"  :color="colorMap[skill]"
     text-color="white">{{ skill }}</v-chip>
                </v-chip-group>
                

                <!-- <v-chip color="#FF694B" class="chip">Job End Date</v-chip> -->
 <div class="job-end-date">
      <v-card-text>Job End Date: {{ formatDate(picked) }}</v-card-text>
    </div>                
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>

       </v-toolbar>
     </template>
     <template  v-slot:item.company="{ item }">
      <router-link :to="{ name: 'Candidates', params: { companyName: item.company, jobTitle: item.title } }">
    {{ getCompanyName(item.company) }}
  </router-link>
 </template>
     <template v-slot:item.skills="{ item }">
 <div>
   <v-chip
     v-for="(skill, index) in item.skills"
     :key="index"
     :color="colorMap[skill]"
     text-color="white"
   >
     {{ skill }}
   </v-chip>
 </div>
 </template>
     <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="px-2" color="black lighten-3" @click="showItemInfo(item)"> mdi-eye </v-icon>
      <v-icon size="small" class="px-2" color="black lighten-3" @click="editItem(item)"> mdi-pencil</v-icon>
      <v-icon size="small" class="px-2" color="black lighten-3" @click="deleteItem(item)"> mdi-delete </v-icon>
     </template>
     <template v-slot:no-data>
       <v-btn color="primary" @click="resetSearch"> Reset </v-btn>
     </template>
   </v-data-table>
  </div>
  <!-- </div> -->
  </template>
 <script setup>
 import Datepicker from 'vue3-datepicker'
 import { ref } from 'vue'

 const skills = ref([]);

const fetchSkills = async () => {
  try {
    const response = await axios.get('http://localhost:8010/api/jobs/skills');
    skills.value = response.data.skills; // Assuming the response contains the skills array
    console.log(skills.value);
  } catch (error) {
    console.error('Error fetching skills:', error);
  }
};

onMounted(() => {
  fetchSkills();
});
 const picked = ref(new Date())
 </script> 
  <script>
  // import data from '../assets/tables/jobTable';
  // import jobForm from './pages/jobForm.vue';
  import {store} from '../store/color';
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  const formatDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date ? date.toLocaleDateString('en-US', options) : '';
};
  export default {
  components: {
    //  jobForm
    // DatePick
   },
   data: () => ({
    search: '',    
    isLoading: true, 
    editedItem: {},
    dialog: false,
    dialogDelete: false,
    infoDialog: false,
    clickedItem: null,
    headers: [
      //  { title: "User ID", key: "_id" },
       { title: "Title", key: "title" },
       { title: "Company", key: "company" },
       { title: "Location", key: "location" },
       { title: "Job Type", key: "job_type" },
       { title: "Experience", key: "experience" },
       { title: "Responsibilities", key: "responsibilities" },
       { title: "Skills", key: "skills" },
       { title: "Actions", key: "actions", sortable: false },
     ],
     jobs: [],
     editedIndex: -1,
     editedItem: {
       user_id: "",
       title: "",
       company: "",
       new: false,
       featured: false,
       location: "",
       job_type: "",
       experience: "",
       job_summary: "",
       responsibilities: "",
       skills: [],
       is_active: false,
       created_by: "",
       updated_by: "",
       created_at: "",
       updated_at: "",
     },
     defaultItem: {
       user_id: "",
       title: "",
       company: "",
       new: false,
       featured: false,
       location: "",
       job_type: "",
       experience: "",
       job_summary: "",
       responsibilities: "",
       skills: [],
       is_active: false,
       created_by: "",
       updated_by: "",
       created_at: "",
      },
   }),
  computed: {
    companyName() {
      console.log('jobs', this.$route.params.companyName);
      return this.$route.params.companyName;
      
    },
  filteredJobs() {
    if (!this.search) {
      return this.jobs;
    }
    const query = this.search.toLowerCase();
    return this.jobs.filter(job => {
      return (
        job.company && job.company.toLowerCase().includes(query) ||
     job.location && job.location.toLowerCase().includes(query) ||
     job.job_type && job.job_type.toLowerCase().includes(query) ||
     job.experience && job.experience.toLowerCase().includes(query) ||
     job.skills && job.skills.some(skill =>
       skill && skill.toLowerCase().includes(query)
     )
      );
    });
  },

   colorMap() {
 const colorMap = store.state.colorMap;
 this.jobs.forEach(job => {
   if (Array.isArray(job.skills)) {
     job.skills.forEach(skill => {
       if (!colorMap[skill]) {
         colorMap[skill] = this.randomColor();
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
 skillsArray() {
  return Object.values(this.skills);
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
   this.fetchJobs();
 },
 methods: {
  formatDate,
  // randomColor,
   fetchJobs() {
     axios.get('http://localhost:8010/api/jobs?limit=100')
       .then(response => {
         this.jobs = response.data;
         this.isLoading = false;
         console.log(this.isLoading);
       })
       .catch(error => {
         console.error(error);
       });

   },
   showItemInfo(item) {
this.clickedItem = item;
this.infoDialog = true;
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
    //  deleteItemConfirm() {
    //    axios.delete(`http://localhost:8010/api/jobs/${this.editedItem._id}`)
    //      .then(() => {
    //        this.jobs.splice(this.editedIndex, 1);
    //        this.closeDelete();
    //      })
    //      .catch(error => {
    //        console.error(error);
    //      });
    //  },
   async deleteItemConfirm() {
  try {
    const token = localStorage.getItem('token');
    const apiUrl = `http://localhost:8010/api/jobs/${this.editedItem._id}`;

    // Check if token exists in local storage
    if (token) {
      // Make the DELETE request with the token in the Authorization header
      await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted item from the local candidates array
      this.jobs.splice(this.editedIndex, 1);
      this.closeDelete();
      console.log('Item deleted successfully');
    } else {
      // Handle the case where the token is missing or invalid
      console.error('No token available.');
      // You might want to handle this scenario, e.g., redirect to login or show an error message.
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    // Handle error scenarios, show a message, etc.
  }
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
//    async save() {
//     const token = localStorage.getItem('token');

//     const base64Url = token.split('.')[1]; // Extract the payload part of the token
//   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Fix characters
//   const decodedToken = JSON.parse(atob(base64)); // Decode the base64 encoded string
//   // const token = localStorage.getItem('token');
//   // const decodedToken = jwt_decode(token); // Use jwt_decode to decode your JWT token
//   // const userIdFromToken = decodedToken.user_id;

//   // Extract user_id from the decoded token
//   const userIdFromToken = decodedToken.user_id;

//   // Update the editedItem object
//   this.editedItem.user_id = userIdFromToken;
//   this.editedItem.created_by = userIdFromToken;
//   this.editedItem.updated_by = userIdFromToken;

//   if (token) {
//     const config = {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     };

//     try {
//       let response;
//       if (this.editedIndex > -1 && this.jobs && this.jobs.length > this.editedIndex) {
//         // Update existing job
//         response = await axios.put(`http://localhost:8010/api/jobs/${this.editedItem._id}`, this.editedItem, config);
//         if (response && response.data) {
//           this.jobs[this.editedIndex] = response.data;
//         }
//       } else {
//         // Create new job
//         response = await axios.post('http://localhost:8010/api/jobs/', this.editedItem, config);
//         if (response && response.data) {
//           this.jobs.push(response.data);
//           console.log('Job created:', response.data);
//         }
//         console.log('Job created:', response.data);

//       }
//       console.log('Job created:', response.data);

//       this.close();

//       // Force a component update or re-render here, depending on your framework or library.
//       // For example, in Vue.js, you might use this.$forceUpdate().

//     } catch (error) {
//       console.error(error);
//     }
//   } else {
//     console.error('Token not found');
//   }
// },

async save() {
  const token = localStorage.getItem('token');

  if (token) {
    const base64Url = token.split('.')[1]; // Extract the payload part of the token
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Fix characters
    const decodedToken = JSON.parse(atob(base64)); // Decode the base64 encoded string

    // Extract user_id from the decoded token
    const userIdFromToken = decodedToken.user_id;

    // Update the editedItem object with user-related fields
    this.editedItem.user_id = userIdFromToken;
    this.editedItem.created_by = userIdFromToken;
    this.editedItem.updated_by = userIdFromToken;

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    try {
      let response;
      if (this.editedIndex > -1 && this.jobs && this.jobs.length > this.editedIndex) {
        // Update existing job
        response = await axios.put(`http://localhost:8010/api/jobs/${this.editedItem._id}`, this.editedItem, config);
        if (response && response.data) {
          this.jobs[this.editedIndex] = response.data;
        }
      } else {
        // Create new job
        response = await axios.post('http://localhost:8010/api/jobs/', this.editedItem, config);
        if (response && response.data) {
          this.jobs.push(response.data);
          console.log('Job created:', response.data);
        }
      }

      this.close();
      // Optionally trigger a component update or re-render here

    } catch (error) {
      console.error(error);
    }
  } else {
    console.error('Token not found');
  }
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
  return company.company;
} else {
  return '';
}
},
resetSearch() {
      this.search = '';
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

.company-details {
  background-color: #f4f4f4;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  box-shadow: none !important;

}

.company-info {
  margin-top: 1rem;
}

.job-details {
  padding: 1rem;
  box-shadow: none !important;
  border-left: 1px solid #eb0f0f; /* Change color and style as needed */

}

.chip {
  color: #fff;
  margin-bottom: 0.5rem;
}

.job-end-date {
  background-color: #FF694B;
  color: #fff;
  border-radius: 8px;
  text-align: center;
  padding: 0.5rem;
  margin-top: 1rem;
}
/*are you sure*/


.delete-confirmation-modal {
  border-radius: 0;
  box-shadow: none;
  padding: 24px;
  text-align: center;
}
.floating-avatar {
  position: relative;
  /* Adjust as needed */
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.delete-confirmation-modal .text-h5 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 24px;
}

.delete-confirmation-modal .v-card-actions {
  padding-top: 24px;
}

.job-end-date {
  background-color: #ff694b;
  color: #fff;
  border-radius: 8px;
  text-align: center;
  padding: 0.5rem;
  margin-top: 1rem;
  /* Add more styles as needed for better readability */
}
.v-data-table__tr:hover{
  background-color: #fff4f4;
  cursor: pointer;
}
</style>