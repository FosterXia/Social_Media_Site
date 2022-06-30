<template>
  <CardsTemplate>
    <div class="card" v-for="user in users" :key="user.id" @click="handleClickUsers(user.id)">
      <div class="card-body">
        <div class="row">
          <div class="col-1">
            <img class="img-fluid" :src="user.photo" alt="photo">
          </div>
          <div class="col-11">
            <div class="username">{{ user.username }}</div>
            <div class="fans">Fans: {{ user.followerCount }}</div>
          </div>
        </div>
      </div>
    </div>
  </CardsTemplate>
</template>

<script>
import CardsTemplate from '../components/Cards.vue';
import $ from 'jquery';
import { ref } from 'vue';
import { useStore } from 'vuex';
import router from '@/router/index';


export default {
  name: 'FriendsView',
  components: {
    CardsTemplate,
  },
  setup: () => {
    const store = useStore();
    const handleClickUsers = (userId) => {
      if (store.state.user.is_login) {
        router.push({name: 'posts', params: {userId}});
      }
      else {
        router.push({name: 'sign-in'});
      }
    }
    let users = ref([]);
    $.ajax({
      url: 'https://app165.acapp.acwing.com.cn/myspace/userlist/',
      type: 'get',
      success: (response) => {
        users.value = response;
      },
    });
    return {
      users,
      handleClickUsers,
    };
  }
}
</script>

<style scoped>
img {
  border-radius: 50%;
}

.username {
  font-weight: bold;
  height: 50%;
}

.fans {
  font-size: 12px;
  color: gray;
  height: 50%;
}

.card {
  margin-top: 10px;
  cursor: pointer;
}

.card:hover {
  box-shadow: 2px 2px 10px gray;
  transition: 500ms;
}
</style>
