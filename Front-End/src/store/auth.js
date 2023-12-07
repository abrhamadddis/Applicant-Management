import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: localStorage.getItem('token') || '',
    id: '',
    role: localStorage.getItem('role') || '', // Get role from localStorage or set to empty string
  }),
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    setId(id) {
      this.id = id;
    },
    setRole(role) {
      this.role = role;
      localStorage.setItem('role', role); // Save role to localStorage
    },
    clearToken() {
      this.token = '';
      this.id = '';
      this.role = '';
      localStorage.removeItem('token');
      localStorage.removeItem('role'); // Remove role from localStorage
    },
  },
});
