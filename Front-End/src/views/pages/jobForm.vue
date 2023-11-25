<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="editedItem.user_id"
          label="User ID"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="editedItem.title"
          label="Title"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          v-model="editedItem.company_name"
          :items="companies"
          :item-props="itemProps"
          item-text="company_name"
          return-object="false"
          label="Company"
        ></v-select>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="editedItem.location"
          label="Location"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="editedItem.job_type"
          label="Job Type"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="editedItem.experience"
          label="Experience"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-textarea
          v-model="editedItem.job_summary"
          label="Job Summary"
        ></v-textarea>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="editedItem.responsibilities"
          label="Responsibilities"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-checkbox
          v-model="editedItem.is_active"
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
        <v-text-field
          v-model="editedItem.created_at"
          label="Created At"
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="editedItem.updated_at"
          label="Updated At"
          readonly
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
 </template>
 
 <script>
 import data from '../../assets/tables/jobTable.js';
 import company_name from '../../assets/tables/companyTable'
 export default {

  props: {
    editedItem: Object,
  },
  methods: {
    itemProps(item) {
      return {
        title: item.company_name,
      }
    },
  },
  data() {
    return {
      job: data[0],
    companies: company_name,
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
 