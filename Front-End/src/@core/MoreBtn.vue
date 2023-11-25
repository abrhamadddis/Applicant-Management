<template>
  <v-icon-btn>
    <v-icon>mdi-dots-vertical</v-icon>

    <v-menu v-if="props.menuList" offset-y>
      <template v-slot:activator="{ on }">
        <v-icon v-on="on">mdi-dots-vertical</v-icon>
      </template>

      <v-list>
        <v-list-item v-for="(item, index) in props.menuList" :key="index">
          <v-list-item-content>
            {{ item }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-icon-btn>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  menuList: {
    type: Array,
    required: false,
  },
  itemProps: {
    type: Boolean,
    required: false,
  },
});
</script>