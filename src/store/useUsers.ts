import { defineStore } from 'pinia';
import { BASEURL } from '../config/baseUrl';
import { Users } from '../types/index';

export const useUsers = defineStore('users', {
  state: () => ({
    users: [
      {
        id: 1,
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        isAdmin: false,
        createdDate: '',
        updatedDate: ''
      }
    ],
    getNewId: 1,
    isLoading: false
  }),
  actions: {
    async fetchUsers() {
      this.isLoading = true;
      try {
        const response = await fetch(`${BASEURL}/users`);
        const data = await response.json();
        this.users = await data;
        this.getNewId = data[data.length - 1].id + 1;
        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteUser(id: number) {
      try {
        await fetch(`${BASEURL}/users/${id}`, { method: 'DELETE' });
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
        await fetch(`${BASEURL}/users/${id}`, updateOptions);
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
        await fetch(`${BASEURL}/users/`, createOptions);
        this.fetchUsers();
      } catch (err) {
        console.log(err);
      }
    }
  },
  getters: {
    getAllUsers(state) {
      return state.users.sort((a, b) => a.username.localeCompare(b.username));
    },
    getNextId(state) {
      return state.getNewId;
    }
  }
});
