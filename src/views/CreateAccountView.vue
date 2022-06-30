<template>
  <CardsTemplate>
    <div class="row">
      <div class="col-3">
        <form @submit.prevent="handleClickSignUpButton">
          <div class="mb-3">
            <label for="username" class="form-label">User name</label>
            <input v-model="username" type="text" class="form-control" id="username">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control" id="password">
          </div>
          <div class="mb-3">
            <label for="password_confirm" class="form-label">Confirm password</label>
            <input v-model="password_confirm" type="password" class="form-control" id="password_confirm">
          </div>
          <button type="submit" class="btn btn-primary">Sign up</button>
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
import $ from 'jquery';
import { useStore } from 'vuex';
import router from '@/router/index';

export default {
  name: 'CreateAccountView',
  components: {
    CardsTemplate,
  },

  setup: () => {
    let username = ref('');
    let password = ref('');
    let password_confirm = ref('');
    let error_message = ref('');
    let store = useStore();

    const handleClickSignUpButton = () => {
      error_message.value = '';
      $.ajax({
        url: 'https://app165.acapp.acwing.com.cn/myspace/user/',
        type: 'POST',
        data: {
          username: username.value,
          password: password.value,
          password_confirm: password_confirm.value,
        },
        success: (response) => {
          if (response.result === '用户名和密码不能为空') {
            error_message.value = 'User name and password cannot be null'
          }
          else if (response.result === '两个密码不一致') {
            error_message.value = 'The passwords you entered do not match'
          }
          else if (response.result === '用户名已存在') {
            error_message.value = 'User name cannot be used'
          }
          else if (response.result === 'success') {
            store.dispatch('signIn', {
              username: username.value,
              password: password.value,
              success: () => {
                router.push({name: 'friends'});
              },
              error: () => {
                error_message.value = 'System error';
              }
            });
          }
        }
      })
    }

    return {
      username,
      password,
      password_confirm,
      error_message,
      handleClickSignUpButton,
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
