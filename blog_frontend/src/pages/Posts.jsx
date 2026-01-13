import React from 'react';
import { useGetPostsQuery } from '../services/postsApi';
import '../styles/posts.scss';
import { PostItem, HomeBlogs, Podcasts } from '../components';

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
        <div>Loading...</div>
      ) : posts?.posts && posts.posts.length > 0 ? (
        <>
          <div className="posts__recent">         
            <PostItem type="recent" post={posts.posts[0]}/>
          </div>
          <div className="posts__list">
            {
              posts.posts.map((post, index) => (
                <PostItem key={post._id || index} type="list" post={post}/>
              ))
            }
          </div>
        </>
      ) : (
        <div>No posts available</div>
      )}
      <HomeBlogs/>
      <Podcasts/>
    </div>
  )
}

export default Posts
