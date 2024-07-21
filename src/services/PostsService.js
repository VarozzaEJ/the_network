import { Logger } from "sass"
import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"


class PostsService {
    async getAllPosts() {
        const response = await api.get('api/posts')
        logger.log(response.data)
        const posts = response.data.posts.map(postPOJO => new Post(postPOJO))
        AppState.posts = posts
        AppState.profile = null
    }
    async getPostsByProfileId(profileId) {
        AppState.profilePosts = []
        const response = await api.get(`api/profiles/${profileId}/posts`)
        logger.log('THESE ARE THE SPECIFIC POSTS 🧍‍♂️', response.data)
        const posts = response.data.posts.map(postPOJO => new Post(postPOJO))
        AppState.profilePosts = posts
    }
    async changePage(pageNumber) {
        const response = await api.get(`api/posts?page=${pageNumber}`)
        //api/profiles/profileId/posts?page=*pageNumber*
        logger.log(response)
        const posts = response.data.posts.map(postPOJO => new Post(postPOJO))
        AppState.posts = posts
        AppState.currentPage = response.data.page
        AppState.totalPages = response.data.pages
    }
    async profileChangePage(url) {
        const response = await api.get(`${url}`)
        logger.log(response.data)
        const posts = response.data.posts.map(postPOJO => new Post(postPOJO))
        AppState.profilePosts = posts
        AppState.currentPage = response.data.page
        AppState.totalPages = response.data.pages
    }
    async createPost(editablePostData) {
        const response = await api.post('api/posts', editablePostData)
        logger.log(response.data)
        const post = new Post(response.data)
        AppState.posts.unshift(post)
        AppState.profilePosts.unshift(post) //NOTE this line fixed my delete not working in profile page????
    }
    async likePost(url, postId) {
        const response = await api.post(url)
        logger.log('liked post', response.data)
        const postIndex = AppState.posts.findIndex((post) => postId == post.id)
        const profilePageIndex = AppState.profilePosts.findIndex((post) => post.id == postId)
        logger.log(postIndex)
        const post = new Post(response.data)
        AppState.posts.splice(postIndex, 1, post)
        if (profilePageIndex != -1) AppState.profilePosts.splice(profilePageIndex, 1, post)

    }
    async deletePost(url, postId) {
        const response = await api.delete(url)
        const postIndex = AppState.posts.findIndex((post) => post.id == postId)
        const profilePageIndex = AppState.profilePosts.findIndex((post) => post.id == postId)
        // if (postIndex == -1) throw new Error("findIndex messed up when deleting a post")

        if (profilePageIndex != -1) AppState.profilePosts.splice(profilePageIndex, 1)
        if (postIndex != -1) AppState.posts.splice(postIndex, 1) //NOTE fix delete in profile page
    }
    async searchPosts(searchTerm) {
        const response = await api.get(`api/posts?query=${searchTerm}`)
        logger.log(response)
        const searchedPosts = response.data.posts.map(postPOJO => new Post(postPOJO))
        AppState.searchingFor = searchTerm
        AppState.posts = searchedPosts
        AppState.currentPage = response.data.page
        AppState.totalPages = response.data.total_pages
    }

}

export const postsService = new PostsService()