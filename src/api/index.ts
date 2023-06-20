// @ts-nocheck comment
import axios from "axios";

const API = axios.create({
  baseURL: "https://xcursions-ng.onrender.com/",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});
/* Blog */
export const fetchPost = (id: string) => API.get(`/blog/posts/${id}`);
export const fetchPosts = () => API.get(`/blog/posts`);
export const fetchCategories = () => API.get(`/blog/categories`);
export const fetchCategory = (id: string) => API.get(`/blog/categories/${id}`);
export const fetchRecommendedPostsByCategory = (id: string) =>
  API.get(`/blog/categories/${id}/posts/recommended`);
export const fetchRecommendedPostsByAuthor = (id: string) =>
  API.get(`/blog/authors/${id}/posts/recommended`);

/* Create a Blog Post Admin authorization header needed */
export const createPost = (newPost: any) => API.post("/blog/posts", newPost);
export const deletePost = (id: string) => API.delete(`/blog/posts/${id}`);
export const updatePost = (id: string, updatedPost: any) =>
  API.put(`/blog/posts/${id}`, updatedPost);
export const createCategory = (newCategory: string) =>
  API.post("/blog/categories", newCategory);
export const updateCategory = (id: string, updatedCategory: string) =>
  API.put(`/blog/categories/${id}`, updatedCategory);
export const deleteCategory = (id: string) =>
  API.delete(`/blog/categories/${id}`);
export const createBlogFeaturedImage = (
  postid: string,
  newFeaturedImage: any
) => API.post(`/blog/posts/${postid}/featured-images`, newFeaturedImage);
export const getBlogFeaturedImage = (postid: string, id: string) =>
  API.get(`/blog/posts/${postid}/featured-images${id}`);
export const updateBlogFeaturedImage = (
  postid: string,
  id: string,
  newFeaturedImage
) => API.put(`/blog/posts/${postid}/featured-images${id}`, newFeaturedImage);
export const deleteBlogFeaturedImage = (postid: string, id: string) =>
  API.delete(`/blog/posts/${postid}/featured-images${id}`);

/* Admin Section // pass header 'Authorization: Bearer YOUR_ADMIN_TOKEN' */

export const getContacts = () => API.get("/contact/contacts");
export const getContact = (id: string) => API.get(`/contact/contacts/${id}`);
export const createContact = (formData: any) =>
  API.post("/contact/contacts", formData);
export const updateContact = (id: string, updatedContact: any) =>
  API.put(`/contact/contacts/${id}`, updatedContact);
export const deleteContact = (id: string) =>
  API.delete(`/contact/contacts/${id}`);
