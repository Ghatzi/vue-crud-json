import { defineStore } from 'pinia';
import { Users } from '../types/index';

export const useUsers = defineStore('users', {
  state: () => ({
    users: [],
    id: 1,
    isLoading: false
  }),
  actions: {
    async fetchUsers() {
      this.isLoading = true;
      try {
        const response = await fetch('http://localhost:5000/users');
        const data = await response.json();
        this.users = await data;
        this.id = data[data.length - 1].id + 1;
        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteUser(id: number) {
      try {
        await fetch(`http://localhost:5000/users/${id}`, { method: 'DELETE' });
        this.fetchUsers();
      } catch (err) {
        console.log(err);
      }
    },
    async updateUser(id: number, updateUser: Users) {
      const updateOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateUser)
      };

      try {
        await fetch(`http://localhost:5000/users/${id}`, updateOptions);
      } catch (err) {
        console.log(err);
      }
    },
    async createUser(addUser: Users) {
      const createOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addUser)
      };

      try {
        await fetch(`http://localhost:5000/users/`, createOptions);
        this.fetchUsers();
      } catch (err) {
        console.log(err);
      }
    }
  },
  getters: {
    getAllUsers(state) {
      return state.users;
    },
    getNextId(state) {
      return state.id;
    }
  }
});
