import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery.js';

const createRequest = (url, method, data) => ({
    url, method, body: data
})

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery,
    tagTypes: ['Post', 'Posts'],
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => createRequest('/posts', 'GET'),
            providesTags: (result) => 
                result 
                ? [...result.posts.map(({ _id }) => ({ type: 'Post', id: _id })), 'Posts'] 
                : ['Posts'],
        }),
        uploadImage: builder.mutation({
            query: (image) => createRequest('/upload', 'POST', image)
        }),
        createPost: builder.mutation({
            query: (post) => createRequest('/post/create', 'POST', post),
            invalidatesTags: ['Posts'],
        }),
        removePost: builder.mutation({
            query: (id) => createRequest(`/post/${id}`, 'DELETE', id),
            invalidatesTags: (result, error, id) => [{ type: 'Post', id }, 'Posts']
        }),
        editPost: builder.mutation({
            query: ({id, fields}) => createRequest(`/post/${id}`, 'PATCH', fields),
            invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }]
        }),
        getOnePost: builder.query({
            query: (id) => createRequest(`/post/${id}`, 'GET'),
            providesTags: (result, error, id) => [{ type: 'Post', id }]
        }),
        likeTogglePost: builder.mutation({
            query: ({postId, userId, state}) => createRequest(`/post/${postId}/likeToggle`, 'PATCH', {userId, state}),
            invalidatesTags: (result, error, { postId }) => [{ type: 'Post', id: postId }],
        }),
        shareTogglePost: builder.mutation({
            query: ({postId, userId, state}) => createRequest(`/post/${postId}/shareToggle`, 'PATCH', {userId, state}),
            invalidatesTags: (result, error, { postId }) => [{ type: 'Post', id: postId }],
        }),
        toggleComment: builder.mutation({
            query: ({postId, userId, commentText, booleanState, commentId}) => createRequest(`/post/${postId}/toggleComment`, 'PATCH', {userId, commentText, booleanState, commentId}),
            invalidatesTags: (result, error, { postId }) => [{ type: 'Post', id: postId }],
        }),
        likeToggleComment: builder.mutation({
            query: ({postId, userId, commentId, booleanState, parentComment}) => createRequest(`/post/${postId}/comment/${commentId}/likeToggleComment`, 'PATCH', {userId, booleanState, parentComment}),
            invalidatesTags: (result, error, { postId }) => [{ type: 'Post', id: postId }],
        }),
        replyToggleComment: builder.mutation({
            query: ({postId, commentId, userId, commentText, booleanState, replyId}) => createRequest(`/post/${postId}/comment/${commentId}/replyToggle`, 'PATCH', {userId, commentText, booleanState, replyId}),
            invalidatesTags: (result, error, { postId }) => [{ type: 'Post', id: postId }],
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
    useLikeTogglePostMutation,
    useShareTogglePostMutation,
    useToggleCommentMutation,
    useLikeToggleCommentMutation,
    useReplyToggleCommentMutation } = postsApi