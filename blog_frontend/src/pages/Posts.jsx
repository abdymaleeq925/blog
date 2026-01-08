import React from 'react';
import { useGetPostsQuery } from '../services/postsApi';
import { Title, PostItem } from '../components';

const Posts = () => {
  const { data : posts } = useGetPostsQuery();
  
  return (
    <div className='posts'>
      <Title
          title="Posts"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          strokeColor="#ff0000"
          minFontSize={36}
        />
        <div className="container">
          <div className="posts__wrapper">
          {
            posts?.posts?.length > 0 ? (
              posts?.posts.map(post => (
                <PostItem
                  key = {post._id}
                  id={post?._id}
                  title = {post.title}
                  author = {post.user.fullName}
                  date = {post.updatedAt}
                  text = {post.text}
                  category = {post.category}
                  image = {post.imageUrl}
                  views = {post.viewsCount}
                  size = "post-item--lg"
                  direction = "col"
                  location = "post-img posts-w"
                />
              ))
            ) : (
              <div className="posts__empty">
                <h2>No posts yet</h2>
              </div>
            )
          }
          </div>
        </div>
    </div>
  )
}

export default Posts
