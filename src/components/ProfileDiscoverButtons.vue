<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';

const currentPage = computed(() => AppState.currentPage)
const totalPages = computed(() => AppState.totalPages)

async function profileChangePage(pageNumber) {
    try {
        await postsService.profileChangePage(pageNumber)
    }
    catch (error) {
        Pop.error(error);
    }
}
</script>


<template>
    <section class="row justify-content-between my-2">
        <button :disabled="currentPage == 1" class="col-3 btn btn-primary"
            @click="profileChangePage(currentPage - 1)"><i class="mdi mdi-arrow-left"></i> Previous</button>
        <div class="col-3 text-center fw-bold">{{ currentPage }} of {{ totalPages }}</div>
        <button :disabled="currentPage == totalPages" @click="profileChangePage(currentPage + 1)"
            class="col-3 btn btn-primary">Next<i class="mdi mdi-arrow-right"></i></button>
    </section>
</template>


<style lang="scss" scoped></style>