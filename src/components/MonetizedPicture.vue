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
    <div class="col d-flex flex-column justify-content-center">
        <div class="d-flex flex-column justify-content-center">
            <a class="" :href="adProp.linkUrl" :title="adProp.title">
                <img :src="adProp.tall" :alt="adProp.title" class="img-fluid ad-card mx-3 my-3 ">
            </a>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.ad-card {
    height: 50vh;
    width: 30vh;
}

a {
    height: 50vh;
    width: 30vh;
}
</style>