import React from 'react';
import { useGetPostsQuery } from '../services/postsApi';
import PostItem from '../components/PostItem';

const Posts = () => {
  const { data : posts } = useGetPostsQuery();
  
  return (
    <div className='posts'>
        <div className="container">
          <div className="posts_wrapper">
          {
            posts?.posts.map(post => (
              <PostItem
                key = {post._id}
                title = {post.title}
                author = {post.user.fullName}
                date = {post.updatedAt}
                text = {post.text}
                tags = {post.tags}
                image = {post.imageUrl}
                size = "post-item--sm"
                direction = "col"
              />
            ))
          }
          </div>
        </div>
    </div>
  )
}

export default Posts
