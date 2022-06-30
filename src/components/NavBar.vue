<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <router-link class="navbar-brand" :to="{name: 'home'}">Sharing</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item ms-5">
          <router-link class="nav-link" :to="{name: 'home'}">Home</router-link>
        </li>
        <li class="nav-item ms-5">
          <router-link class="nav-link" :to="{name: 'friends'}">Users</router-link>
        </li>
        <li class="nav-item ms-5" v-if="$store.state.user.is_login">
          <router-link class="nav-link" :to="{name: 'posts', params: {userId: $store.state.user.id}}">Posts</router-link>
        </li>
      </ul>
      <ul class="navbar-nav" v-if="!$store.state.user.is_login">
        <li class="nav-item ms-3">
          <router-link class="nav-link" :to="{name: 'sign-in'}">Sign in</router-link>
        </li>
        <li class="nav-item ms-3">
          <router-link class="nav-link" :to="{name: 'create-account'}">Create account</router-link>
        </li>
      </ul>
      <ul class="navbar-nav" v-else>
        <li class="nav-item ms-3">
          <span class="nav-link">hello, {{ $store.state.user.username }}</span>
        </li>
        <li class="nav-item ms-3">
          <a @click="handleClickSignOut" class="nav-link" style="cursor: pointer;">Sign out</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
import { useStore } from 'vuex'

export default {
    name: 'NavBar',
    setup: () => {
      const store = useStore();

      const handleClickSignOut = () => {
        store.commit('signOut');
      }

      return {
        handleClickSignOut,
      }
    }
}
</script>

<style scoped>
</style>