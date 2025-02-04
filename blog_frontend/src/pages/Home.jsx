import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IoArrowForwardCircle } from "react-icons/io5";
import { IoArrowBackCircle } from "react-icons/io5";

import { Title, PostItem, HomeHeroGrid } from '../components';
import { useGetPostsQuery } from '../services/postsApi';


const Home = () => {
  const [postList, setPostList] = useState([]);
  const { data, isFetching, refetch } = useGetPostsQuery();

  const userId = useSelector(state => state?.auth?.data?._id);
  const location = useLocation();

  const postsPerPage = 6;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = data?.length > postsPerPage ? Math.ceil(data?.length / postsPerPage) : 1;
  const currentData = postList?.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

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
                (isFetching ? [...Array(3)] : currentData)?.map((post, index) => (
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
              {
                postList?.length > 6 && (
                  <div className="pagination">
                    <IoArrowBackCircle
                      onClick={currentPage > 1 ? () => setCurrentPage((prev) => prev - 1) : undefined}
                      style={{ cursor: currentPage === 1 ? "not-allowed" : "pointer", opacity: currentPage === 1 ? 0.5 : 1, fontSize: "25px" }}
                    />
                    <span>{currentPage} / {totalPages}</span>
                    <IoArrowForwardCircle
                      onClick={currentPage < totalPages ? () => setCurrentPage((prev) => prev + 1) : undefined}
                      style={{ cursor: currentPage === totalPages ? "not-allowed" : "pointer", opacity: currentPage === totalPages ? 0.5 : 1, fontSize: "25px" }}
                    />
                  </div>
                )
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
