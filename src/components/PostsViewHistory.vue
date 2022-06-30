<template>
    <div class="card">
        <div class="card-body">
            <div class="card content" v-for="post in posts.posts" :key="post.id">
                <div class="card-body">
                    {{post.content}}
                    <button v-if="is_me" type="button" class="btn btn-danger btn-sm" @click="handleClickDelete(post.id)">
                        Delete
                    </button>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue';

export default {
    name: 'PostsViewHistory',
    props: {
        posts: {
            type: Object,
            required: true,
        },
        user: {
            type: Object,
            required: true,
        },
    },
    setup: (props, context) => {
        const store = useStore();
        let is_me = computed(() => {
            return Number(store.state.user.id) === Number(props.user.id); 
        });

        const handleClickDelete = (post_id) => {
            context.emit('delete_a_post', post_id);
        }

        return {
            handleClickDelete,
            is_me,
        }
    }
}
</script>

<style scoped>
.content {
    margin-bottom: 10px;
}

button {
    padding: 2px 4px;
    font-size: 12px;
    float: right;
}
</style>