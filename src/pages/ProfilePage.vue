<script setup>
import { computed, onMounted, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { profilesService } from '../services/ProfilesService.js';
import PostCard from '../components/PostCard.vue';
import { postsService } from '../services/PostsService.js';
import ProfileDiscoverButtons from '../components/ProfileDiscoverButtons.vue';
import AccountForm from '../components/AccountForm.vue';


const route = useRoute()
const profile = computed(() => AppState.profile)
const profilePosts = computed(() => AppState.profilePosts)
const profileId = computed(() => AppState.profileId)
const account = computed(() => AppState.account)


watchEffect(() => {
    logger.log(route.params)
    const profileId = route.params.profileId
    getProfileById(profileId)
    getPostByProfileId(profileId)
})


async function getProfileById(profileId) {
    try {
        await profilesService.getProfileById(profileId)
    }
    catch (error) {
        Pop.error(error);
    }
}

async function getPostByProfileId(profileId) {
    try {
        await postsService.getPostsByProfileId(profileId)
    }
    catch (error) {
        Pop.error(error);
    }
}
</script>
<!-- 667b2c408382cf0d5652146e = ""667b2c408382cf0d5652146e"" -->

<template>
    <div v-if="profile" class="container">
        <div>

        </div>
        <div class="row row-color mt-3" :style="`background-image: url(${profile.coverImg})`">
            <div class="col-md-6 px-0 d-flex">
                <img :src="profile.picture" :alt="profile.name" class="img-fluid">

            </div>
            <div class="col-md-6 text-center my-auto d-flex align-items-center">
                <i v-if="profile.graduated" class="fs-1 mdi mdi-account-school text-shadow"></i>
                <h1 class="display-1 fw-bold text-light" style="text-shadow: 0 3px 1px black;">{{ profile.name }}
                </h1>
                <div class="d-flex justify-content-center">
                    <p v-if="profile.linkedin" class="fs-1 text-shadow"><a :href="profile.linkedin"><i
                                class="mdi mdi-linkedin"></i></a></p>
                    <p v-if="profile.resume" class="fs-1 text-shadow"><a :href="profile.resume"><i
                                class="mdi mdi-file-account"></i></a></p>
                </div>
            </div>
        </div>
        <div class="row d-flex justify-content-center">
            <div class="col-md-8 mt-1 ms-1 bg-success">
                <p class="text-center fs-4"><i class="mdi mdi-school me-2"></i>{{ profile.class }}</p>
                <p v-if="profile.bio" class="text-center fs-5">{{ profile.bio }}</p>
            </div>
        </div>
        <div v-for="post in profilePosts" :key="post.id" class="col-12 mt-3">
            <PostCard :postProp="post" />
        </div>

        <div class="col-12">

            <DiscoverButtons />

        </div>

    </div>
</template>



<style lang="scss" scoped>
img {
    height: 40vh;
    border-radius: 0 50% 50% 0;
    aspect-ratio: 1/1;
    object-fit: cover;
}

.row-color {
    background-size: cover;
    background-position: center;
}

.text-shadow {
    text-shadow: 2px 2px black;
}
</style>