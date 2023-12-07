<template>
  <v-data-table
    :headers="headers"
    :items="filteredCandidates"
    :sort-by="[{ key: 'calories', order: 'asc' }]"
    v-if="!loading && filteredCandidates.length"

  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title v-if="$route.params.companyName">Candidates for {{ $route.params.companyName }}</v-toolbar-title>
        <v-toolbar-title v-else>Candidates</v-toolbar-title>

        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" dark class="mb-2" v-bind="props">
              Add Candidate
            </v-btn>
          </template>
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
                      v-model="editedItem.company"
                      label="company Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.location"
                      label="Location"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.status"
                      label="Status"
                    ></v-text-field>
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
  <div v-else-if="!loading">No candidates found for {{ $route.params.companyName }}</div>
      <div v-else>Loading candidates...</div>
</template>
<script>
import axios from 'axios';

export default {
  data: () => ({
    search:'',
    dialog: false,
    editedItem: {},
    dialogDelete: false,
    infoDialog: false,
    clickedItem: null,
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
      { title: "Actions", key: "actions", sortable: false },
    ],
    candidates: [],
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
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Candidate" : "Edit Candidate";
    },
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

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    '$route.params.companyName': function(newCompanyName) {
    this.editedItem.company = newCompanyName;
  }
  },

  created() {
    this.fetchCandidates();
  },

  methods: {

    async fetchCandidates() {
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
},
showErrorToUser(message) {
  // Show error to the user
  alert(message);
},
    showItemInfo(item) {
this.clickedItem = item;
this.infoDialog = true;
},
    editItem(item) {
      this.editedIndex = this.candidates.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
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

    async save() {
      const token = localStorage.getItem('token');

const base64Url = token.split('.')[1]; // Extract the payload part of the token
const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Fix characters
const decodedToken = JSON.parse(atob(base64)); // Decode the base64 encoded string
const userIdFromToken = decodedToken.user_id;

  // Update the editedItem object
  this.editedItem.user_id = userIdFromToken;
  this.editedItem.created_by = userIdFromToken;
  this.editedItem.updated_by = userIdFromToken;

  if (token) {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    try {
      let response;
      if (this.editedIndex > -1 && this.candidates && this.candidates.length > this.editedIndex) {
        // Update existing candidate
        response = await axios.put(`http://localhost:8010/api/candidates/${this.editedItem._id}`, this.editedItem, config);
        if (response && response.data) {
          this.candidates[this.editedIndex] = response.data;
        }
      } else {
        this.editedItem.company = this.$route.params.companyName;

        // Create new candidate
        response = await axios.post('http://localhost:8010/api/candidates/', this.editedItem, config);
        if (response && response.data) {
          // this.editedItem.company = this.$route.params.companyName; // Update editedItem.company
          this.candidates.push(response.data);

           // Update company name
      // this.$nextTick(() => {
      //   this.editedItem.company = this.$route.params.companyName;
      // });
          console.log('candidate created:', response.data);
        }
 
    }
      this.close();
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error('Token not found');
  }
},
  }
}
</script>
