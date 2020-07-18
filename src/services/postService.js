import http from "../services/httpService";
import { apiUrl } from "../config.json";


export function createPost(post) {
    return http.post(`${apiUrl}/posts`, post)
}


export function getPosts() {
    return http.get(`${apiUrl}/posts/my-posts`)
}


export function getAllPosts() {
    return http.get(`${apiUrl}/posts`)
}

export function getOnePost(postId) {
    return http.get(`${apiUrl}/posts/${postId}`)
}

export function deletePost(id) {
    return http.delete(`${apiUrl}/posts/${id}`)
}

export function editPost(post) {
    const postId = post._id;
    delete post._id;
    return http.put(`${apiUrl}/posts/${postId}`, post)
}
export default { createPost, getPosts, getAllPosts, deletePost, editPost, getOnePost };