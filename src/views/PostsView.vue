<template>
  <CardsTemplate>
    <div class="row">
      <div class="col-3">
        <PostsViewInfo
          @follow="follow"
          @unfollow="unfollow"
          :user="user"
        ></PostsViewInfo>
        <PostsViewPost v-if="checkIfMyself"
          @publish_a_post="publish_a_post"
        ></PostsViewPost>
      </div>
      <div class="col-9">
        <PostsViewHistory :posts="posts"
          :user="user"
          @delete_a_post="delete_a_post"
        >
        </PostsViewHistory>
      </div>
    </div>
  </CardsTemplate>
</template>

<script>
import CardsTemplate from '../components/Cards.vue';
import PostsViewInfo from '../components/PostsViewInfo.vue';
import PostsViewHistory from '../components/PostsViewHistory.vue';
import PostsViewPost from '@/components/PostsViewPost.vue';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import $ from 'jquery';
import { computed } from 'vue';

export default {
  name: 'PostsView',
  components: {
    CardsTemplate,
    PostsViewInfo,
    PostsViewHistory,
    PostsViewPost,
  },

  setup: () => {
      const route = useRoute();
      const userId = route.params.userId;
      const store = useStore();

      const checkIfMyself = computed(() => {
        return Number(store.state.user.id) === Number(userId);
      })

      const user = reactive({});

      $.ajax({
          url: 'https://app165.acapp.acwing.com.cn/myspace/getinfo/',
          type: 'GET',
          data: {
            user_id: userId,
          },
          headers: {
            'Authorization': "Bearer " + store.state.user.access,
          },
          success: (response) => {
            user.id = response.id;
            user.username = response.username;
            user.followerCount = response.followerCount;
            user.is_followed = response.is_followed;
            user.photo = response.photo;
          }
      });

      const posts = reactive({});

      $.ajax({
          url: 'https://app165.acapp.acwing.com.cn/myspace/post/',
          type: 'GET',
          data: {
            user_id: userId,
          },
          headers: {
            'Authorization': "Bearer " + store.state.user.access,
          },
          success: (response) => {
            posts.posts = response;
            posts.count = response.length;
          }
      });

      const follow = () => {
          if (user.is_followed)     return;
          $.ajax({
            url: 'https://app165.acapp.acwing.com.cn/myspace/follow/',
            type: 'POST',
            data: {
              target_id: user.id,
            },
            headers: {
              'Authorization': "Bearer " + store.state.user.access,
            },
            success: () => {
              user.is_followed = true;
              user.followerCount++;
            }
          });

      }

      const unfollow = () => {
          if (!user.is_followed)    return;
            $.ajax({
            url: 'https://app165.acapp.acwing.com.cn/myspace/follow/',
            type: 'POST',
            data: {
              target_id: user.id,
            },
            headers: {
              'Authorization': "Bearer " + store.state.user.access,
            },
            success: () => {
              user.is_followed = false;
              user.followerCount--;
            }
          });

      }

      const publish_a_post = (e) => {
          posts.count++;
          posts.posts.unshift({
              id: posts.count,
              userId: 1,
              content: e,
          });
      }

      const delete_a_post = (post_id) => {
          $.ajax({
            url: 'https://app165.acapp.acwing.com.cn/myspace/post/',
            type: 'DELETE',
            data: {
              post_id: post_id,
            },
            headers: {
              'Authorization': "Bearer " + store.state.user.access,
            },
            success: () => {
              posts.posts = posts.posts.filter(post => post.id !== post_id);
              posts.count = posts.posts.length;             
            }
          });

      }

      return {
          user: user,
          follow: follow,
          unfollow: unfollow,
          posts: posts,
          publish_a_post: publish_a_post,
          checkIfMyself,
          delete_a_post,
      };
  },
}
</script>

<style scoped></style>
