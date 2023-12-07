<template>
  <v-container>
    <v-row>
      <!-- <v-col cols="12" md="6">
        <v-text-field
          v-model="editedItem.user_id"
          variant="underlined"
          label="User ID"
        ></v-text-field>
      </v-col> -->
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
          v-model="editedItem.requirements"
          :items="requirements"
          label="Requirements"
          multiple
          chips
        ></v-combobox>
      </v-col> -->
      <v-combobox
        v-model="editedItem.requirements"
        :items="requirements"
        label="Requirements"
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
<!-- 
      <v-col cols="12" md="6">
        <v-text-field
          v-model="editedItem.created_at"
          label="Created At"
          variant="underlined"
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="editedItem.updated_at"
          label="Updated At"
          variant="underlined"
          readonly
        ></v-text-field>
      </v-col> -->
      <v-btn @click="saveJobData">Save</v-btn>
   <v-btn @click="deleteJobData">Delete</v-btn>
    </v-row>
  </v-container>
 </template>
 
 <script>
 import data from '../../assets/tables/jobTable.js';
 import company from '../../assets/tables/companyTable';
 import axios from 'axios'
 export default {

  props: {
   editedItem: Object,
   editedIndex: Number,
 },
 methods: {
   saveJobData() {
    if (this.editedIndex > -1) {
      axios.put(`http://localhost:8010/api/jobs/${this.editedItem._id}`, this.editedItem)
       .then(response => {
           console.log('Job updated:', response.data);
           this.$emit('job-updated', response.data);
         })
         .catch(error => {
           console.log('Error updating job:', error);
         });
     } else {
       // If editedIndex is -1, this means we are creating a new job
       axios.post('http://localhost:8010/api/jobs', this.editedItem)
         .then(response => {
           console.log('Job created:', response.data);
           this.$emit('job-created', response.data);
         })
         .catch(error => {
           console.log('Error creating job:', error);
         });
     }
   },
 },
  data() {
    return {
      job: data[0],
      companies: company,
      requirements: [],
      // companies: data.company,
      // requirements: data.requirement,
    };
  },
  mounted(){
    this.requirements = data[0].requirements;
  }
 };
 </script>
 