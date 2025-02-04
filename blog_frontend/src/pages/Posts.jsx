import React from 'react';
import { useGetPostsQuery } from '../services/postsApi';
import { Title, PostItem } from '../components';

const Posts = () => {
  const { data : posts } = useGetPostsQuery();
  
  return (
    <div className='posts'>
      <Title title="posts"/>
        <div className="container">
          <div className="posts__wrapper">
          {
            posts?.posts.map(post => (
              <PostItem
                key = {post._id}
                id={post?._id}
                title = {post.title}
                author = {post.user.fullName}
                date = {post.updatedAt}
                text = {post.text}
                tags = {post.tags}
                image = {post.imageUrl}
                views = {post.viewsCount}
                size = "post-item--lg"
                direction = "col"
                location = "post-img"
              />
            ))
          }
          </div>
        </div>
    </div>
  )
}

export default Posts
