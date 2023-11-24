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
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
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
          location: "Addis Ababa",
          status: "Interviewed",
        },
        {
          firstName: "Meron",
          lastName: "Tekle",
          email: "merontekle44@gmail.com",
          phoneNumber: "0912345678",
          location: "Addis Ababa",
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
          status: "Rejected",
        },
        {
          firstName: "Samuel",
          lastName: "Wondimu",
          email: "samuelwondimu55@gmail.com",
          phoneNumber: "0911122334",
          location: "Addis Ababa",
          status: "Offered",
        },
        {
          firstName: "Sara",
          lastName: "Assefa",
          email: "saraassefa88@gmail.com",
          phoneNumber: "0976123456",
          location: "Addis Ababa",
          status: "Rejected",
        },
        {
          firstName: "Yonas",
          lastName: "Mengistu",
          email: "yonasmengistu66@gmail.com",
          phoneNumber: "0967890123",
          location: "Addis Ababa",
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
    }

  },
};
</script>
