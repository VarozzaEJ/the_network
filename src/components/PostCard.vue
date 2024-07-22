<script setup>
import { RouterLink } from 'vue-router';
import { Post } from '../models/Post.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { postsService } from '../services/PostsService.js';
import { AppState } from '../AppState.js';


const props = defineProps({ postProp: { type: Post, required: true } })

async function likePost(url, postId) {
    try {
        await postsService.likePost(url, postId)
        Pop.success('Liked Post')
    }
    catch (error) {
        Pop.error(error);
    }
}

async function deletePost(url, postId) {
    try {
        const wantsToDelete = await Pop.confirm("Are You Sure?")
        if (!wantsToDelete) return
        await postsService.deletePost(url, postId)
    }
    catch (error) {
        Pop.error(error);
    }
}

</script>


<template>
    <div class="col-12 text-center d-flex justify-content-center align-items-center">
        <div class="card mb-5 mt-4 mx-4 w-75 ">
            <div class="row g-0">
                <div class="col-md-4">
                    <img :src="postProp.imgUrl" class="img-fluid rounded-start h-100" :alt="postProp.body">
                </div>
                <div class="col-md-8 ">
                    <div class="d-flex flex-column justify-content-between">
                        <div class="card-body">
                            <h5 class="card-title"></h5>
                            <p class="card-text fs-5">{{ postProp.body }}</p>
                            <p class="card-text"><small class="text-body-secondary">{{
                                postProp.createdAt.toLocaleString()
                                    }}</small></p>
                        </div>
                        <div class="card-body mt-5">
                            <div class="d-flex align-items-center justify-content-end mb-4 ">
                                <p class="card-text fs-4 fw-bold me-2">{{ postProp.creator.name }}</p>
                                <RouterLink :to="{ name: 'Profile', params: { profileId: postProp.creatorId } }">
                                    <img :title="`Navigate to ${postProp.creator.name}'s Profile Page`"
                                        class="img-fluid creator-img" :src="postProp.creator.picture"
                                        :alt="postProp.creator.name">
                                </RouterLink>
                                <!-- TODO like button is here -->
                            </div>
                            <div class="d-flex justify-content-between">
                                <h5 v-if="postProp.creatorId == AppState.account?.id">
                                    <button title="Delete Your Post"
                                        v-on:click="deletePost(`api/posts/${postProp.id}`, postProp.id)"
                                        class="btn btn-outline-danger"><i class=" text-start fs-2 mdi mdi-delete"></i>
                                    </button>
                                </h5>
                                <h5 v-if="(postProp.creatorId != AppState.account?.id)"
                                    class=" d-flex align-items-center justify-content-end">
                                    <button class="btn btn-outline-primary text-end"
                                        v-on:click="likePost(`api/posts/${postProp.id}/like`, postProp.id)">
                                        <i class="mdi mdi-heart text-end fs-2" role="button"
                                            title="Like This Post"></i>{{
                                                postProp.likeIds.length }}
                                    </button>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.creator-img {
    height: 100px;
    width: 100px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    object-fit: center;
    object-position: center;
}
</style>