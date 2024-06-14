import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Title, PostItem, HomeHeroGrid } from '../components';
import { useGetPostsQuery } from '../services/postsApi';


const Home = () => {
  const [postList, setPostList] = useState([]);
  const { data, isFetching, refetch } = useGetPostsQuery();

  const userId = useSelector(state => state?.auth?.data?._id);
  const location = useLocation();

  useEffect(() => {
    setPostList(data?.posts);
  }, [data?.posts]);

  useEffect(() => {
    refetch()
  }, [location.pathname, refetch])

  const handlePostDelete = (id) => {
    setPostList(postList.filter(post => post._id !== id))
  }

  return (
    <div>
      <Title title="the blog" />
      <div className="container">
        <HomeHeroGrid postList={postList} />
        <h2 className='title-sm'>All blog posts</h2>
        {
          window.innerWidth > 1024 ? (
            <div className="posts__wrapper flex wrap">
              {
                (isFetching ? [...Array(3)] : postList)?.map((post, index) => (
                  isFetching ? (<PostItem isLoading={true} key={index} />) :
                    <PostItem
                      isLoading={false}
                      key={post?._id}
                      id={post?._id}
                      title={post?.title}
                      author={post?.user.fullName}
                      date={post?.createdAt}
                      text={post?.text}
                      tags={post?.tags}
                      views={post?.viewsCount}
                      image={post?.imageUrl}
                      size="post-item--sm"
                      direction="column"
                      isEditing={userId === post?.user?._id}
                      handlePostDelete={handlePostDelete}
                    />

                ))
              }
            </div>
          ) : (
            <Swiper spaceBetween={20} slidesPerView={2} className="swiper">
              <div className="posts__wrapper flex wrap">
                {
                  (isFetching ? [...Array(3)] : postList)?.map((post, index) => (
                    isFetching ? (<PostItem isLoading={true} key={index} />) :
                      <SwiperSlide className="swiper-slide">
                        <PostItem
                          isLoading={false}
                          key={post?._id}
                          id={post?._id}
                          title={post?.title}
                          author={post?.user.fullName}
                          date={post?.createdAt}
                          text={post?.text}
                          tags={post?.tags}
                          views={post?.viewsCount}
                          image={post?.imageUrl}
                          size="post-item--sm"
                          direction="column"
                          isEditing={userId === post?.user?._id}
                          handlePostDelete={handlePostDelete}
                        />
                      </SwiperSlide>
                  ))
                }
              </div>
            </Swiper>
          )
        }
      </div>
    </div>
  )
}

export default Home
