<template>
    <div class="card content">
        <div class="card-body">
            <label for="post-textarea" class="form-label">New post</label>
            <textarea v-model="content" class="form-control" id="post-textarea" rows="3"></textarea>
            <button @click="handleClickPublishButton" type="button" class="btn btn-primary btn-sm">Publish</button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import $ from 'jquery';
import { useStore } from 'vuex';

export default {
    name: 'PostsViewPost',
    setup: (props, context) => {
        const store = useStore();
        let content = ref('');

        const handleClickPublishButton = () => {
            $.ajax({
                url: 'https://app165.acapp.acwing.com.cn/myspace/post/',
                type: 'POST',
                data: {
                    content: content.value,
                },
                headers: {
                            'Authorization': "Bearer " + store.state.user.access,
                },
                success: () => {
                    context.emit('publish_a_post', content.value);
                    content.value = '';
                }
            });

        }

        return {
            content: content,
            handleClickPublishButton: handleClickPublishButton,
        };
    }
}
</script>

<style scoped>
.content {
    margin-top: 20px;
}
button {
    margin-top: 20px;

}
</style>
