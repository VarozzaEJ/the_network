<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { monetizedPicturesService } from '../services/MonetizedPicturesService.js';
import { MonetizedPicture } from '../models/MonetizedPicture.js';


const monetizedPictures = computed(() => AppState.monetizedPictures)

const props = defineProps({ adProp: { type: MonetizedPicture, required: true } })



</script>


<template>
    <img :src="adProp.square" :alt="adProp.title" class="img-fluid ad-card mb-3 ms-5 ">
</template>


<style lang="scss" scoped>
.ad-card {
    height: 25vh;
    width: 25vh;
}
</style>