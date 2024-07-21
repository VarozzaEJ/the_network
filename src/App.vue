<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from './AppState'
import MonetizedPicture from './components/MonetizedPicture.vue';
import Navbar from './components/Navbar.vue'
import { monetizedPicturesService } from './services/MonetizedPicturesService.js';
import Pop from './utils/Pop.js';
import DiscoverButtons from './components/DiscoverButtons.vue';

const ads = computed(() => AppState.monetizedPictures)

onMounted(() => {
  getMonetizedPictures()
})

async function getMonetizedPictures() {
  try {
    await monetizedPicturesService.getMonetizedPictures()
  }
  catch (error) {
    Pop.error(error);
  }
}
</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <div class="d-flex">
      <router-view />
      <div class="d-flex flex-column">
        <MonetizedPicture v-for=" ad in ads" :key="ad.id" :ad-prop="ad" />
      </div>
    </div>
    <PostModal />
  </main>
  <footer class="bg-dark text-light">

  </footer>
</template>

<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
