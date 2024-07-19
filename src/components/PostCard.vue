<script setup>
import { RouterLink } from 'vue-router';
import { Post } from '../models/Post.js';


const props = defineProps({ postProp: { type: Post, required: true } })

</script>


<template>
    <div class="col-12 text-center d-flex justify-content-left align-items-center">
        <div class="card mb-5 ms-4" style="width: 540px; ">
            <div class="row g-0">
                <div class="col-md-4">
                    <img :src="postProp.imgUrl" class="img-fluid rounded-start h-100" :alt="postProp.body">
                </div>
                <div class="col-md-8 ">
                    <div class="d-flex flex-column justify-content-between">
                        <div class="card-body">
                            <h5 class="card-title"></h5>
                            <p class="card-text">{{ postProp.body }}</p>
                            <p class="card-text"><small class="text-body-secondary">{{
                                postProp.createdAt.toLocaleString()
                                    }}</small></p>
                        </div>
                        <div class="card-body mt-5">
                            <RouterLink :to="{ name: 'Profile', params: { profileId: postProp.creatorId } }">
                                <img class="img-fluid creator-img" :src="postProp.creator.picture"
                                    :alt="postProp.creator.name">
                            </RouterLink>
                            <!-- TODO like button is here -->
                            <h5 class="text-end"><i class="mdi mdi-heart text-end fs-2" role="button"
                                    title="Like This Post"></i></h5>
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