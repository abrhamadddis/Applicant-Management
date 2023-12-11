<template>
    <div>
      <vue-quill :modules="modules" v-model="content" />
    </div>
   </template>
   
   <script>
   import { QuillEditor } from 'vue-quill-editor'
   
   export default {
    components: {
      QuillEditor
    },
    data() {
      return {
        content: '<p>Hello World!</p>',
        modules: {
          toolbar: [
            ['bold', 'italic'],
            ['list', 'bullet', 'ordered']
          ]
        }
      }
    }
   }
   </script>
   