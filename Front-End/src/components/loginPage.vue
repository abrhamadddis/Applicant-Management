<template>
   <form @submit.prevent="login" class="mt-5 pt-10 flex justify-items-center">
      <v-img
      class="mx-auto my-6"
      max-width="228"
      src="../assets/mmcylogo.png"
    ></v-img>
     <v-card
       class="mx-auto pa-12 pb-8"
       elevation="8"
       max-width="448"
       rounded="lg"
     >     
       <div class="text-subtitle-1 text-medium-emphasis">Account</div>
 
       <v-text-field
         v-model="email"
         density="compact"
         placeholder="Email address"
         prepend-inner-icon="mdi-email-outline"
         variant="outlined"
       ></v-text-field>
 
       <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
         Password
 
         <a
           class="text-caption text-decoration-none text-blue"
           href="#"
           rel="noopener noreferrer"
           target="_blank"
         >
           Forgot login password?</a>
       </div>
 
       <v-text-field
         v-model="password"
         :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
         :type="visible ? 'text' : 'password'"
         density="compact"
         placeholder="Enter your password"
         prepend-inner-icon="mdi-lock-outline"
         variant="outlined"
         @click:append-inner="visible = !visible"
       ></v-text-field>

       <p class="login-message">{{ message }}</p>
 
       <v-card
         class="mb-12"
         color="surface-variant"
         variant="tonal"
       >
         <v-card-text class="text-medium-emphasis text-caption">
           Note: Attempting to access the system without the correct login credentials may result in security measures being applied to your account. Ensure you have the necessary information or seek assistance to avoid any inconvenience.
         </v-card-text>
       </v-card>
 
       <v-btn
         block
         class="mb-8"
         color="blue"
         size="large"
         variant="tonal"
         type="submit"
       >
         Log In
       </v-btn>
     </v-card>
   </form>
 </template>
<script>
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

export default {
  name: 'loginPage',
  setup() {
    const email = ref('');
    const password = ref('');
    const message = ref('');

    const authStore = useAuthStore();
    const router = useRouter();

    const login = async () => {
      if (!email.value || !password.value) {
        message.value = 'Please provide both email and password.';
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email.value, password: password.value }),
        });
        const data = await response.json();

        if (response.ok) {
          message.value = 'Login successful';
          authStore.setToken(data.token);
          authStore.setId(data.id);
          authStore.setRole(data.role);
          console.log(data);
          router.push('/dashboard');
        } else {
          message.value = data.message || 'Login failed';
        }
      } catch (error) {
        console.error(error);
        message.value = 'An error occurred during login.';
      }
    };

    return { email, password, message, login };
  },
  data: () => ({
       visible: false,
  }),
};
</script>