<script setup>
import { ref } from 'vue';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import { Modal } from 'bootstrap';


const editablePostData = ref({

    body: '',
    imgUrl: '',

})

async function createPost() {
    try {
        // logger.log('POST CREATION DATA', editablePostData)
        await postsService.createPost(editablePostData.value)
        editablePostData.value = {
            body: '',
            imgUrl: ''
        }
        Modal.getOrCreateInstance('#exampleModal').hide()
    }
    catch (error) {
        Pop.error(error);
    }
}


</script>


<template>



    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Create Post</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Create"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="createPost()">
                        <div class="mb-3">
                            <label for="body" class="form-label">Caption</label>
                            <input v-model="editablePostData.body" type="text" class="form-control" id="body">
                        </div>
                        <div class="mb-3">
                            <label for="imgUrl" class="form-label">ImgUrl</label>
                            <input v-model="editablePostData.imgUrl" type="url" class="form-control" id="imgUrl">
                        </div>
                        <button type="submit" class="btn btn-primary">Save and Post</button>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>