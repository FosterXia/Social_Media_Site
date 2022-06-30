<template>
  <CardsTemplate>
    <div class="row">
      <div class="col-3">
        <form @submit.prevent="handleClickSignInButton">
          <div class="mb-3">
            <label for="username" class="form-label">User name</label>
            <input v-model="username" type="text" class="form-control" id="username" placeholder="default: 123">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control" id="password" placeholder="default: 123">
          </div>
          <button type="submit" class="btn btn-primary">Sign in</button>
          <div class="error-message">
            {{ error_message }}
            <!-- user name or password is wrong  -->
          </div>
        </form>
      </div>
    </div>
  </CardsTemplate>
</template>

<script>
import CardsTemplate from '../components/Cards.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import router from '@/router/index';

export default {
  name: 'SignInView',
  components: {
    CardsTemplate,
  },

  setup: () => {
    let username = ref('');
    let password = ref('');
    let error_message = ref('');
    let store = useStore();

    const handleClickSignInButton = () => {
      // console.log(username.value, password.value);
      error_message.value = '';
      store.dispatch('signIn', {
        username: username.value,
        password: password.value,
        success: () => {
          router.push({name: 'friends'});
        },
        error: () => {
          error_message.value = 'User name or password is wrong';
        }
      });
    }

    return {
      username,
      password,
      error_message,
      handleClickSignInButton
    }
  }
}
</script>

<style scoped>
div {
  margin: auto;
}

button {
  width: 100%;
}

.error-message {
  margin-top: 5px;
  font-size: 12px;
  color: red;
  height: 2.5em;
}
</style>
