import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery.js';

const createRequest = (url, method, data) => ({
    url, method, body: data
})

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery,
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => createRequest('/posts', 'GET')
        }),
        uploadImage: builder.mutation({
            query: (image) => createRequest('/upload', 'POST', image)
        }),
        createPost: builder.mutation({
            query: (post) => createRequest('/post/create', 'POST', post)
        }),
        removePost: builder.mutation({
            query: (id) => createRequest(`/post/${id}`, 'DELETE', id)
        }),
        editPost: builder.mutation({
            query: ({id, fields}) => createRequest(`/post/${id}`, 'PATCH', fields)
        }),
        getOnePost: builder.query({
            query: (id) => createRequest(`/post/${id}`, 'GET')
        }),
        createTag: builder.mutation({
            query: (tag) => createRequest('/tags/create', 'POST', tag) 
        }),
        getAllTags: builder.query({
            query: () => createRequest('/tags/get-all', 'GET')
        }),
        likeTogglePost: builder.mutation({
            query: ({postId, userId, state}) => createRequest(`/post/${postId}/likeToggle`, 'PATCH', {userId, state})
        }),
        toggleComment: builder.mutation({
            query: ({postId, userId, commentText, booleanState, commentId}) => createRequest(`/post/${postId}/toggleComment`, 'PATCH', {userId, commentText, booleanState, commentId})
        }),
        likeToggleComment: builder.mutation({
            query: ({postId, userId, commentId, booleanState, parentComment}) => createRequest(`/post/${postId}/comment/${commentId}/likeToggleComment`, 'PATCH', {userId, booleanState, parentComment})
        }),
        replyToggleComment: builder.mutation({
            query: ({postId, commentId, userId, commentText, booleanState, replyId}) => createRequest(`/post/${postId}/comment/${commentId}/replyToggle`, 'PATCH', {userId, commentText, booleanState, replyId})
        }),
    })
})

export const {
    useGetPostsQuery,
    useUploadImageMutation,
    useCreatePostMutation,
    useRemovePostMutation,
    useEditPostMutation,
    useGetOnePostQuery,
    useCreateTagMutation,
    useGetAllTagsQuery,
    useLikeTogglePostMutation,
    useToggleCommentMutation,
    useLikeToggleCommentMutation,
    useReplyToggleCommentMutation } = postsApi