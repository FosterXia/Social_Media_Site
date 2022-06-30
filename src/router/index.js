import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import FriendsView from '../views/FriendsView.vue';
import CreateAccountView from '../views/CreateAccountView.vue';
import PostsView from '../views/PostsView.vue';
import SignInView from '../views/SignInView.vue';
import NotFoundView from '../views/NotFoundView.vue';

const routes = [
  {
    path: '/sharing/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/sharing/users/',
    name: 'friends',
    component: FriendsView
  },
  {
    path: '/sharing/sign-in/',
    name: 'sign-in',
    component: SignInView
  },
  {
    path: '/sharing/create-account/',
    name: 'create-account',
    component: CreateAccountView
  },
  {
    path: '/sharing/posts/:userId',
    name: 'posts',
    component: PostsView
  },
  {
    path: '/sharing/404/',
    name: '404',
    component: NotFoundView
  },
  {
    path: '/sharing/:catchAll(.*)',
    redirect: '/sharing/404/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
