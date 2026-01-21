import React from 'react';

import { useGetPostsQuery } from '../services/postsApi';
import { PostItem, HomeBlogs, VideoPack } from '../components';

import '../styles/posts.scss';

const Posts = () => {

  const { data: posts, isFetching } = useGetPostsQuery();

  return (
    <div className='posts'>
      <div className="posts__title">
        <div className="container">
          <div className="banner">
            <h1>Today's Headlines: Stay</h1>
            <div className="subbanner">
              <h1>Informed</h1>
              <p>Explore published posts from our users. We bring you interesting news on the most significant events, trends, and stories. Discover the world through our news coverage.</p>
            </div>
          </div>
        </div>
      </div>
      {isFetching ? (
        <>
          <div className="posts__recent">
            <h3 className='posts__recent-title'>Latest post</h3>
            <PostItem isLoading={true}/>
          </div>
          <h3 className='posts__list-title'>Slide for more posts</h3>
          <div className="posts__list">
            {[...Array(3)].map((_, i) => (
              <PostItem key={i} variant="list" isLoading={true}/>
            ))}
          </div>
        </>
      ) : posts?.posts && posts.posts.length > 0 ? (
        <>
          <div className="posts__recent">
            <h3 className='posts__recent-title'>Latest post</h3>
            <PostItem type="recent" post={posts.posts[posts.posts.length - 1]} />
          </div>
          <h3 className='posts__list-title'>Slide for more posts</h3>
          <div className="posts__list">
            {
              posts.posts.slice(1).map((post, index) => (
                <PostItem key={post._id || index} type="list" post={post} />
              ))
            }
          </div>
        </>
      ) : (
        <h1 className='posts-empty'>No posts available</h1>
      )}
      <HomeBlogs />
      <VideoPack />
    </div>
  )
}

export default Posts
