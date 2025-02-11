import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

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
        likePost: builder.mutation({
            query: ({postId, userId}) => createRequest(`/post/${postId}/like`, 'PATCH', {userId})
        }),
        dislikePost: builder.mutation({
            query: ({postId, userId}) => createRequest(`/post/${postId}/dislike`, 'PATCH', {userId})
        }),
        addComment: builder.mutation({
            query: ({postId, userId, commentText}) => createRequest(`/post/${postId}/addComment`, 'POST', {userId, commentText})
        })
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
    useLikePostMutation,
    useDislikePostMutation,
    useAddCommentMutation } = postsApi