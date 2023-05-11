import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/Home.vue')
  },
  {
    path: '/users',
    name: 'Users',
    children: [
      {
        path: '/users',
        name: 'UsersList',
        component: () => import('../features/UsersList.vue')
      },
      {
        path: '/users/:id',
        name: 'EditUser',
        component: () => import('../features/EditUser.vue')
      },
      {
        path: '/users/create',
        name: 'CreateUser',
        component: () => import('../features/CreateUser.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
