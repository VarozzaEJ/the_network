<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger.js';

const currentPage = computed(() => AppState.currentPage)
const totalPages = computed(() => AppState.totalPages)
const route = useRoute()
const profile = computed(() => AppState.profile)
const profileId = computed(() => AppState.profileId)

onMounted(() => {
    logger.log('HERE IS THE PROFILE ID FROM THE PROFILEDISCOVERBUTTONS', route.params)
    const profileId = route.params.profileId

})


async function changePage(pageNumber) {
    try {
        await postsService.changePage(pageNumber)
    }
    catch (error) {
        Pop.error(error);
    }
}

async function profileChangePage(profileId, pageNumber) {
    try {
        await postsService.profileChangePage(pageNumber)
    }
    catch (error) {
        Pop.error(error);
    }
}
</script>

<!-- v-if="!profileId" -->
<template>
    <section class="row justify-content-between my-2">
        <button :disabled="currentPage == 1" class="col-3 btn btn-primary" @click="changePage(currentPage - 1)"><i
                class="mdi mdi-arrow-left"></i> Previous</button>
        <div class="col-3 text-center fw-bold">{{ currentPage }} of {{ totalPages }}</div>
        <button :disabled="currentPage == totalPages" @click="changePage(currentPage + 1)"
            class="col-3 btn btn-primary">Next<i class="mdi mdi-arrow-right"></i></button>
    </section>
    <!-- <section v-else class="row">
        <button :disabled="currentPage == 1" class="col-3 btn btn-primary" @click="profileChangePage(``)"><i
                class="mdi mdi-arrow-left"></i> Previous</button>
        <div class="col-3 text-center fw-bold">{{ currentPage }} of {{ totalPages }}</div>
        <button :disabled="currentPage == totalPages"
            @click="profileChangePage(`api/profiles/63922fd4274d85e20428e306/posts?page=2`)"
            class="col-3 btn btn-primary">Next<i class="mdi mdi-arrow-right"></i></button>
    </section> -->
</template>


<style lang="scss" scoped></style>