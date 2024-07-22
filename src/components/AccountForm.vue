<script setup>
import { onMounted, ref } from 'vue';
import { accountService } from '../services/AccountService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';

const editableAccountData = ref({
    name: '',
    picture: '',
    coverImg: '',
    linkedin: '',
    bio: '',
    graduated: false,
    class: '',
    github: '',
    resume: '',
})


async function updateAccount() {
    try {
        await accountService.updateAccount(editableAccountData.value)
        Pop.success('Successfully Updated Account Details')
    } catch (error) {
        Pop.error(error)
    }
}
onMounted(() => { editableAccountData.value = { ...AppState.account } })


</script>


<template>
    <div>

        <form @submit.prevent="updateAccount()">
            <div class="mb-3">
                <label for="name" class="form-label">Account Name</label>
                <input v-model="editableAccountData.name" type="text" class="form-control" id="name" required
                    maxlength="100">
            </div>
            <div class="mb-3">
                <label for="picture" class="form-label">Account Picture</label>
                <input v-model="editableAccountData.picture" type="url" class="form-control" id="picture" required
                    maxlength="500">
            </div>
            <div class="mb-3">
                <label for="coverImg" class="form-label">Account CoverImg</label>
                <input v-model="editableAccountData.coverImg" type="url" class="form-control" id="coverImg"
                    maxlength="500">
            </div>
            <div class="mb-3">
                <label for="linkedin" class="form-label">Account Linkedin</label>
                <input v-model="editableAccountData.linkedin" type="url" class="form-control" id="linkedin"
                    maxlength="500">
            </div>
            <div class="mb-3">
                <label for="resume" class="form-label">Account Resume</label>
                <input v-model="editableAccountData.resume" type="url" class="form-control" id="resume" maxlength="500">
            </div>
            <div class="mb-3">
                <label for="github" class="form-label">Account GitHub</label>
                <input v-model="editableAccountData.github" type="url" class="form-control" id="github" maxlength="500">
            </div>

            <div class="mb-3">
                <label for="bio" class="form-label">Account Bio</label>
                <textarea v-model="editableAccountData.bio" class="form-control" id="bio" rows="3"
                    maxlength="1000"></textarea>
            </div>
            <div class="mb-3">
                <label for="bio" class="form-label">Class Of:</label>
                <input v-model="editableAccountData.class" class="form-control" type="number" id="class" rows="1"
                    min="2015" max="2025">
            </div>

            <div class="mb-3 form-check">
                <input v-model="editableAccountData.graduated" type="checkbox" class="form-check-input" id="graduated">
                <label class="form-check-label" for="graduated">Have you graduated from CodeWorks?</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>


<style lang="scss" scoped></style>