<template>
  <v-container>
    <v-card-text class="bg-">
      <h2 >User List</h2>
    </v-card-text>
      <v-row justify="center" class="pt-5 ">
      <v-col  v-for="user in users" :key="user.Email">
        <v-card>
          <v-col class="flex  text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="5rem"
              viewBox="0 0 448 512"
            >
              <path
                d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
              />
            </svg>
            <v-card-text>
              <h4>{{ user.firstName }}</h4>
              <p>{{ user.lastName }}</p>
              <p>{{ user.Email }}</p>
            </v-card-text>
          </v-col>
        </v-card>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<style scoped>
.custom-row {
 flex: none !important;
}
</style>
<script>
export default {
  data() {
    return {
      users: [
        {
          firstName: "Abrham",
          lastName: "Addis",
          Email: "abrhamaddis32@gmail.com",
        },
        {
          firstName: "Hannah",
          lastName: "Smith",
          Email: "hannahsmith78@gmail.com",
        },
        {
          firstName: "Alex",
          lastName: "Johnson",
          Email: "alexjohnson44@gmail.com",
        },
        {
          firstName: "Emily",
          lastName: "Davis",
          Email: "emilydavis19@gmail.com",
        },
        {
          firstName: "Emily",
          lastName: "Davis",
          Email: "emilydavis19@gmail.com",
        },
        {
          firstName: "Alex",
          lastName: "Johnson",
          Email: "alexjohnson44@gmail.com",
        },
        {
          firstName: "Emily",
          lastName: "Davis",
          Email: "emilydavis19@gmail.com",
        },
        {
          firstName: "Emily",
          lastName: "Davis",
          Email: "emilydavis19@gmail.com",
        },{
          firstName: "Alex",
          lastName: "Johnson",
          Email: "alexjohnson44@gmail.com",
        },
        {
          firstName: "Emily",
          lastName: "Davis",
          Email: "emilydavis19@gmail.com",
        },
        {
          firstName: "Emily",
          lastName: "Davis",
          Email: "emilydavis19@gmail.com",
        }

      ],
    };
  },
};
</script>
