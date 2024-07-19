import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class PostsService {
    async getAllPosts() {
        const response = await api.get('api/posts')
        logger.log(response.data)
        const posts = response.data.posts.map(postPOJO => new Post(postPOJO))
        AppState.posts = posts
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

}

export const postsService = new PostsService()