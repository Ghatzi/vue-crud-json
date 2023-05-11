import { defineStore } from 'pinia';

export const useUsers = defineStore('users', {
  state: () => ({
    users: []
  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await fetch('http://localhost:5000/users');
        const data = await response.json();
        this.users = await data;
      } catch (err) {
        console.log(err);
      }
    }
  },
  getters: {
    getUsersLength(state) {
      return state.users.length;
    }
  }
});
