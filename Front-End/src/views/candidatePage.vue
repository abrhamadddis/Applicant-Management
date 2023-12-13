<template>
  <div class="bg-lightGrey px-10  py-5">
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" class="text-center">
            <v-toolbar-title v-if="$route.params.companyName">Candidates for {{ $route.params.companyName }}</v-toolbar-title>
        <v-toolbar-title v-else>Candidates</v-toolbar-title>
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
          <v-toolbar flat class="bg-primary rounded-lg">
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
          v-model="search"
          prepend-icon="mdi-magnify"
          label="Search"
          variant="underlined"
          single-line
          hide-details
          ></v-text-field>
          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="1000px">
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
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.first_name"
                      label="First Name"
                    ></v-text-field>
                    
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.last_name"
                      label="Last Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.email"
                      label="email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.phone_number"
                      label="Phone Number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.position"
                      label="Position"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                   <v-select
                   v-model=editedItem.company
                    :items="filteredCompanies"
                   label = "Company"
                   ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      v-model="editedItem.job_title"
                      :items="jobTitles"
                      label="Job Title"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.foreign_name"
                      label="Foreign Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.location"
                      label="Location"
                    ></v-text-field>
                  </v-col>
                  <!-- <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.cv"
                      label="Upload Cv"
                    ></v-text-field>
                  </v-col> -->
                  <v-col cols="12" sm="6" md="4">
  <input type="file" @change="onFileChange" accept=".pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">
</v-col>

                  <v-col cols="12" sm="6" md="4">
                   <v-select
                   v-model=editedItem.source
                    :items=sources
                   label = "Sources"
                   ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                   <v-select
                   v-model=editedItem.status
                    :items=statuses
                   label = "status"
                   ></v-select>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-textarea
                      v-model="editedItem.overall_feedback"
                      label="Over All Feedback"
                    ></v-textarea>
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
        </v-dialog>
          <!-- user information  -->
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
                      <p>Foreign Name: {{ clickedItem.foreign_name }}</p>
                    </v-col>
                </v-row>
              </v-col>

              <v-col>
                  <p> Applied For: {{ clickedItem.position }}</p>
                  <p> Job Title: {{ clickedItem.job_title }}</p>
                  <p>Desired salary: 500</p>
                  <p>Company: {{ clickedItem.company }}</p>
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
                  <v-chip :color="getStatusColor(clickedItem.status)" dark>
                    
                      <v-card-title class="px-4 ">
                        <h3 class="pb-10 h-12 pt-10">{{ clickedItem.status }}</h3>  
                      </v-card-title>
                    
                  </v-chip>
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
                    <p class="px-2 py-2">Overall Feedback: {{ clickedItem.overall_feedback }}</p>
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
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      </div>
    </template>
    <template v-slot:item.status="{ item }">
      <v-chip :color="getStatusColor(item.status)" dark>{{ item.status }}</v-chip>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon @click=showItemInfo(item)> mdi-eye </v-icon>
      <v-icon @click="editItem(item)" size="small" class="me-2" >
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
      
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
  <div v-else-if="!loading">No candidates found for {{ $route.params.companyName }}
    <v-btn color="primary" @click="resetSearch"> Reset </v-btn>

  </div>
      <div v-else>Loading candidates...</div>
    </div>
</template>
<script>
import axios from 'axios'
import {getCandidates, getCandidateById, createCandidate, updateCandidate} from '../service/candidateService'
export default {
  data: () => ({
    search:'',
    dialog: false,
    editedItem: {},
    dialogDelete: false,
    infoDialog: false,
    clickedItem: null,
    jobTitles: [],
    selectedJobTitle: null,
    selectedFile: null,

    headers: [
      {
        title: "First Name",
        align: "start",
        sortable: false,
        key: "first_name",
      },
      { title: "Last Name", key: "last_name" },
      { title: "Email", key: "email" },
      { title: "Phone Number", key: "phone_number" },
      { title: "Company Name", key: "company" },
      { title: "Location", key: "location" },
      { title: "Status", key: "status" },
      { title: "Job Title", key: "job_title" },
      { title: "Actions", key: "actions", sortable: false },
    ],
    candidates: [],
    editedIndex: -1,
    editedItem: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      position:"",
      company:"",
      foreign_name: "",
      location: "",
      cv:"",
      source: "",
      status: "",
      overall_feedback: "",


    },
    defaultItem: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      position:"",
      company:"",
      job_title: "",
      foreign_name: "",
      location: "",
      cv:"",
      source: "",
      status: "",
      overall_feedback: "",
    },
    statuses:[
      "Pending",
      "Interviewed",
      "Offered",
      "Rejected",
      "Hired"
    ],
    sources:[
      "Linkedin",
      "Telegram Bot",
      "Tiktok",
      "Dereja",
      "University"
    ],
    companys: [
      "CCI",
      "Vermasoft",
      "IAG"
    ]
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Candidate" : "Edit Candidate";
    },
    filteredCompanies() {
      const companyName = this.$route.params.companyName;
    if (companyName) {
      return this.companys.filter(company => {
        return company.toLowerCase() === companyName.toLowerCase();
      });
    } else {
      return this.companys; // Return all companies when there's no company name in the route
    }
  },
  filteredJobTitles() {
      const jobTitleParam = this.$route.params.jobTitle;
      console.log("the tyjobtitle from filteredJobTitles", jobTitleParam);
      if (jobTitleParam) {
        return this.jobTitles.filter(job => {
          return job.toLowerCase() === jobTitleParam.toLowerCase();
        });
      } else {
        return jobTitleParam; // Return all job titles when there's no jobTitleParam
        // console.log("the cxvzsdgjobtitle from filteredJobTitles", jobTitles);
      }
    },
  // filteredJobTitles() {
  //     const jobTitle = this.$route.params.jobTitle;
  //     console.log('the jobtitle from filteredJobTitles',jobTitle);
  //   if (jobTitle) {
  //     return this.jobTitle.filter(job_title => {
  //       return job_title.company === selectedCompany;
  //     });
  //   } else {
  //     return this.jobTitle; // Return all companies when there's no company name in the route
  //   }
  // },
    
    filteredCandidates() {
    console.log('Search:', this.search);
    console.log('Company Name:', this.$route.params.companyName );
console.log('Job Title:', this.$route.params.jobTitle);
    if (!this.search && this.$route.params.companyName !== undefined && this.$route.params.companyName !== '') {
      // this.$route.params.jobtitle
      const filtered = this.candidates.filter(candidate => candidate.company === this.$route.params.companyName && candidate.job_title === this.$route.params.jobTitle);
      console.log('Filtered by Company:', filtered);
      return filtered;
    } else if (!this.search) {
      console.log('All Candidates:', this.candidates);
      return this.candidates; // Return all candidates when no search and no company filter is provided
    }
    if (!this.search) {
    return this.candidates;
  }

  const query = this.search.toLowerCase();
  const filteredBySearch = this.candidates.filter(candidate => {
    return (
      (candidate.first_name && candidate.first_name.toLowerCase().includes(query)) ||
      (candidate.last_name && candidate.last_name.toLowerCase().includes(query)) ||
      (candidate.email && candidate.email.toLowerCase().includes(query)) ||
      (candidate.phone_number && typeof candidate.phone_number === 'string' && candidate.phone_number.toLowerCase().includes(query)) ||
      (candidate.location && candidate.location.toLowerCase().includes(query)) ||
      (candidate.status && candidate.status.toLowerCase().includes(query)) ||
      (candidate.company && candidate.company.toLowerCase().includes(query))
    );
  });

  return filteredBySearch;
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
    // this.fetchCandidates();
    // console.log('job title ',this.$route.params.jobTitle);
    const statusFilter = this.$route.query.status;
    console.log("ststus filtered", statusFilter);
  if (statusFilter === 'Offered') {
    this.fetchOfferedCandidates(); // Call method to fetch 'offered' candidates
  } else {
    this.fetchCandidates(); // Fetch all candidates or handle other status cases
  }
  },
  mounted() {
    this.fetchJobTitles();
  },

  methods: {
    
  onFileChange(event) {
    const file = event.target.files[0];
    this.selectedFile = file;
  },
    async fetchOfferedCandidates() {
    try {
      const token = localStorage.getItem('token');
      const apiUrl = `http://localhost:8010/api/candidates?status=Offered`;
      if (token) {
      const response= await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        this.candidates = response.data;
        console.log("Offered candidates", this.candidates);
      }
    } catch (error) {
      console.error(error);
    }
  },
    async fetchJobTitles() {
      try {
        const response = await axios.get('http://localhost:8010/api/jobs');
        this.jobTitles = response.data.map(job => job.title);
        console.log('Job Titles from fetchJobTitles method:', this.jobTitles);
      } catch (error) {
        console.error('Error fetching job titles:', error);
      }
    },
    resetSearch() {
      this.search = '';
      console.log('Search:', this.search);
    },
    async fetchCandidates() {
      try {
        const response = await getCandidates()

        this.candidates = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    editItem(item) {
      this.editedIndex = this.candidates.indexOf(item);
      this.editedItem = item;
      this.dialog = true
    },
    deleteItem (item) {
        this.editedIndex = this.candidates.indexOf(item)
        this.editedItem = Object.assign({}, item)
       
        this.dialogDelete = true
      },

async deleteItemConfirm() {
  try {
    const token = localStorage.getItem('token');
    const apiUrl = `http://localhost:8010/api/candidates/${this.editedItem._id}`;

    // Check if token exists in local storage
    if (token) {
      // Make the DELETE request with the token in the Authorization header
      await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted item from the local candidates array
      this.candidates.splice(this.editedIndex, 1);
      this.closeDelete();
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

    async save() {
      const token = localStorage.getItem('token');

const base64Url = token.split('.')[1]; // Extract the payload part of the token
const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Fix characters
const decodedToken = JSON.parse(atob(base64)); // Decode the base64 encoded string
const userIdFromToken = decodedToken.user_id;

const formData = new FormData();
  formData.append('cv', this.selectedFile);

  // Add other candidate data to the form if needed
  formData.append('first_name', this.editedItem.first_name);
  formData.append('last_name', this.editedItem.last_name);

  // Update the editedItem object
  this.editedItem.user_id = userIdFromToken;
  this.editedItem.created_by = userIdFromToken;
  this.editedItem.updated_by = userIdFromToken;


      if (this.editedIndex > -1) {
        Object.assign(this.candidates[this.editedIndex], this.editedItem);
        try{
          const apiEndpoint = await updateCandidate(this.editedItem._id, this.editedItem);
          console.log("from candidate page",apiEndpoint)
          Object.assign(this.candidates[this.editedIndex], apiEndpoint);
          console.log(this.editedItem)
          // this.selectedFile = null;

        }catch(error){
          console.error(error);
        }
      } else {

        this.editedItem.company = this.$route.params.companyName;


        this.candidates.push(this.editedItem);
        try{
          const newCandidate = await createCandidate(this.editedItem);
          console.log(newCandidate)
        }catch(error){
          console.error(error);
        }
      }
      this.close();
    },
    getStatusColor(status) {
      switch (status) {
        case 'Pending':
          return 'blue';
        case 'Interviewed':
          return 'orange';
        case 'Offered':
          return 'green';
        case 'Rejected':
          return 'red';
        default:
          return 'grey';
      }
    },
    showItemInfo(item) {
     this.clickedItem = item;
     this.infoDialog = true;
   }

  },
};
</script>
