<script setup>
import { computed, ref } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { postsService } from '../services/PostsService.js';

const searchTerm = ref('')
const searchingFor = computed(() => AppState.searchingFor)


async function searchPosts() {
    try {
        logger.log('searching for 🔎', searchTerm.value)
        await postsService.searchPosts(searchTerm.value)
        searchTerm.value = ''
    }
    catch (error) {
        Pop.error(error);
    }
}
</script>


<template>
    <form @submit.prevent="searchPosts()">
        <div class="input-group rounded-pill">

            <input v-model="searchTerm" type="text" class="form-control" />

            <button class="btn btn-info px-3"><i class="mdi mdi-magnify"></i></button>
        </div>
    </form>
</template>


<style lang="scss" scoped></style>