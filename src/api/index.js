import axios from "axios"

const url = "https://memories-project-by-z.herokuapp.com/posts";

export const  fetchPosts = () => axios.get(url).then((res)=>res)

export const createPost = (newPost) => axios.post(url,newPost)

export const updatePost = (id,updatedPost) => axios.patch(`${url}/${id}`,updatedPost);

export const deletePost = (id) => axios.delete(`${url}/${id}`)

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`)