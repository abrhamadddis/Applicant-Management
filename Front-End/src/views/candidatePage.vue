<template>
  <v-data-table
    :headers="headers"
    :items="candidates"
    :sort-by="[{ key: 'calories', order: 'asc' }]"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Candidates</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="1000px">
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
                      v-model="editedItem.firstName"
                      label="First Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.lastName"
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
                      v-model="editedItem.phoneNumber"
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
                   v-model=editedItem.currentClient
                    :items=clients
                   label = "Current Clien"
                   ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.foreignName"
                      label="Foreign Name"
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
                      v-model="editedItem.cv"
                      label="Upload Cv"
                    ></v-text-field>
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
                      v-model="editedItem.overAllFeedBack"
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
                      <p>First Name: {{ clickedItem.firstName }}</p>
                      <p>Last Name: {{ clickedItem.lastName }}</p>
                      <p>Foreign Name: {{ clickedItem.foreignName }}</p>
                    </v-col>
                </v-row>
              </v-col>

              <v-col>
                  <p> Applied For: {{ clickedItem.position }}</p>
                  <p>Desired salary: 500</p>
                  <p>Current Client: {{ clickedItem.currentClient }}</p>
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
                    <p class="pl-2"> {{ clickedItem.phoneNumber }}</p>
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
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    infoDialog: false,
    clickedItem: null,
    headers: [
      {
        title: "First Name",
        align: "start",
        sortable: false,
        key: "firstName",
      },
      { title: "Last Name", key: "lastName" },
      { title: "Email", key: "email" },
      { title: "Phone Number", key: "phoneNumber" },
      { title: "Company Name", key: "current_client" },
      { title: "Location", key: "location" },
      { title: "Status", key: "status" },
      { title: "Actions", key: "actions", sortable: false },
    ],
    candidates: [],
    editedIndex: -1,
    editedItem: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      position:"",
      currentClient:"",
      foreignName: "",
      location: "",
      cv:"",
      source: "",
      status: "",
      overAllFeedBack: "",


    },
    defaultItem: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      position:"",
      currentClient:"",
      foreignName: "",
      location: "",
      cv:"",
      source: "",
      status: "",
      overAllFeedBack: "",
    },
    statuses:[
      "Pending",
      "Interviewed",
      "Offered",
      "Rejected"
    ],
    sources:[
      "Linkedin",
      "Telegram Bot",
      "Tiktok",
      "Dereja",
      "University"
    ],
    clients: [
      "CCI",
      "Vermasoft",
      "IAG"
    ]
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Candidate" : "Edit Candidate";
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
      // Initialize the candidates array with the new structure
      this.candidates = [
        {
          firstName: "Abrham",
          lastName: "Addis",
          email: "abrhamaddis32@gmail.com",
          phoneNumber: "0978464825",
          position: 'cvent developer',
          location: "Addis Ababa",
          current_client: "ACI",
          status: "Interviewed",
          overAllFeedBack: "over all feedback about his person spans 12 out of 12 columns on extra small to small screens, 6 out of 12 columns on small to medium screens, and 4 out of 12 columns on medium and larger screens. If you want to increase the width, you can adjust these values. For instance, if you want the textarea to take up half the screen on medium and larger screens, you"
        },
        {
          firstName: "Meron",
          lastName: "Tekle",
          email: "merontekle44@gmail.com",
          phoneNumber: "0912345678",
          location: "Addis Ababa",
          current_client: "CCI",
          status: "Pending",
        },
        {
          firstName: "Dawit",
          lastName: "Alemayehu",
          email: "dawit.alemayehu@gmail.com",
          phoneNumber: "0923456789",
          location: "Addis Ababa",
          status: "Offered",
        },
        {
          firstName: "Hannah",
          lastName: "Girma",
          email: "hannahgirma77@gmail.com",
          phoneNumber: "0998765432",
          location: "Addis Ababa",
          current_client: "CCI",
          status: "Rejected",
        },
        {
          firstName: "Samuel",
          lastName: "Wondimu",
          email: "samuelwondimu55@gmail.com",
          phoneNumber: "0911122334",
          location: "Addis Ababa",
          current_client: "ACI",
          status: "Pending Review",
        },
        {
          firstName: "Yonas",
          lastName: "Mengistu",
          current_client: "BCI",

          status: "Offered",

        },
        {
          firstName: "Ruth",
          lastName: "Kassa",
          email: "ruthkassa22@gmail.com",
          phoneNumber: "0909876543",
          location: "Addis Ababa",
          status: "Rejected",
        },

        // Add more items as needed
      ];
    },

    editItem(item) {
      this.editedIndex = this.candidates.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true
    },
    deleteItem (item) {
        this.editedIndex = this.candidates.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
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
      if (this.editedIndex > -1) {
        Object.assign(this.candidates[this.editedIndex], this.editedItem);
      } else {
        this.candidates.push(this.editedItem);
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
