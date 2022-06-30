<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-3">
                    <img class="img-fluid" :src="user.photo" alt="photo">
                </div>
                <div class="col-9">
                    <div class="username">{{ user.username }}</div>
                    <div class="fans">Fans: {{ user.followerCount }}</div>
                    <button @click="handleClickFollowButton" v-if="!user.is_followed" type="button" class="btn btn-primary btn-sm follow">Follow</button>
                    <button @click="handleClickUnfollowButton" v-if="user.is_followed" type="button" class="btn btn-secondary btn-sm follow">Unfollow</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'PostsViewInfo',
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    setup: (props, context) => {
        
        const handleClickFollowButton = () => {
            context.emit('follow');
        }

        const handleClickUnfollowButton = () => {
            context.emit('unfollow');
        }

        return {
            handleClickFollowButton: handleClickFollowButton,
            handleClickUnfollowButton: handleClickUnfollowButton,
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
}

.fans {
    font-size: 12px;
    color: gray;
}

.follow {
    padding: 2px 4px;
    font-size: 12px;
}
</style>