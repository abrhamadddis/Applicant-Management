import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: '',
    id: '',
    role: '',
  }),
  actions: {
    setToken(token) {
      this.token = token;
    },
    setId(id) {
      this.id = id;
    },
    setRole(role) {
      this.role = role;
    },
    clearToken() {
      this.token = '';
      this.id = '';
      this.role = '';
    },
  },
});
