import React, { useEffect, useState } from 'react';
import { useGetPostsQuery } from '../services/postsApi';
import '../styles/posts.scss';
import { Title, PostItem, HomeBlogs, Podcasts } from '../components';
import { fetchAIVideos } from '../api/videos';

const Posts = () => {
  const { data : posts } = useGetPostsQuery();


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
      <div className="posts__recent">         
          <PostItem type="recent" post={posts.posts[0]}/>
      </div>
      <div className="posts__list">
        {
          posts.posts.map((post, index) => (
            <PostItem type="list" post={post}/>
          ))
        }
      </div>
      <HomeBlogs/>
      <Podcasts/>
    </div>
  )
}

export default Posts
