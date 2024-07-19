<script setup>
import { AppState } from "../AppState.js";
import { postsService } from "../services/PostsService.js";
import Pop from "../utils/Pop";
import { computed, onMounted } from "vue";


const posts = computed(() => AppState.posts)

onMounted(() => {
  getAllPosts()
})

async function getAllPosts() {
  try {
    await postsService.getAllPosts()
  }
  catch (error) {
    Pop.error(error);
  }
}


</script>

<template>
  <div class="container-fluid ">
    <div class="row">
      <div v-for="post in posts" :key="post.id" class="col-12 ">
        <PostCard :postProp='post' />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <DiscoverButtons />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
