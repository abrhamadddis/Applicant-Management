<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="editedItem.user_id"
          variant="underlined"
          label="User ID"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="editedItem.title"
          variant="underlined"
          label="Title"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          v-model="editedItem.current_client"
          :items="companies"
          :item-props="itemProps"
          item-text="current_client"
          return-object="false"
          variant="underlined"
          label="Company"
        ></v-select>
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
      </v-col>
    </v-row>
  </v-container>
 </template>
 
 <script>
 import data from '../../assets/tables/jobTable.js';
 import current_client from '../../assets/tables/companyTable'
 export default {

  props: {
    editedItem: Object,
  },
  methods: {
    itemProps(item) {
      return {
        title: item.current_client,
      }
    },
  },
  data() {
    return {
      job: data[0],
      companies: current_client,
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
 