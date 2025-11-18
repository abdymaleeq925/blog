import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { IoArrowForwardCircle } from "react-icons/io5";
import { IoArrowBackCircle } from "react-icons/io5";

import HeroBanner from "../assets/hero-image.png";
import { Title, PostItem, HomeHeroGrid } from "../components";
import { useGetPostsQuery } from "../services/postsApi";
import "swiper/swiper-bundle.css"; // Импортируйте стили Swiper

import "../styles/home.scss";
import HomeBanner from "../components/HomeBanner";
import HomeFeatures from "../components/HomeFeatures";

const Home = () => {
  const [postList, setPostList] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { data, isFetching, refetch } = useGetPostsQuery();

  const userId = useSelector((state) => state?.auth?.data?._id);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();

  const postsPerPage = 6;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages =
    data?.length > postsPerPage ? Math.ceil(data?.length / postsPerPage) : 1;
  const currentData = postList?.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  useEffect(() => {
    setPostList(data?.posts);
  }, [data?.posts]);

  useEffect(() => {
    refetch();
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePostDelete = (id) => {
    setPostList(postList.filter((post) => post._id !== id));
  };

  return (
    <div>
      {/* <div className="hero-banner-wrapper">
        <img className="hero-banner" src={HeroBanner} alt="Hero banner"/>
      </div> */}
      {/* <div className="container"> */}
        <HomeBanner/>
        <HomeFeatures/>
        {postList?.length > 0 ? (
          <>
            <HomeHeroGrid postList={postList} />
            <h2 className="title-sm">All blog posts</h2>
            {windowWidth > 1024 ? (
              <div className="posts__wrapper flex wrap">
                {(isFetching ? [...Array(3)] : currentData)?.map(
                  (post, index) =>
                    isFetching ? (
                      <PostItem isLoading={true} key={index} />
                    ) : (
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
                    )
                )}
                {postList?.length > 6 && (
                  <div className="pagination">
                    <IoArrowBackCircle
                      onClick={
                        currentPage > 1
                          ? () => setCurrentPage((prev) => prev - 1)
                          : undefined
                      }
                      style={{
                        cursor: currentPage === 1 ? "not-allowed" : "pointer",
                        opacity: currentPage === 1 ? 0.5 : 1,
                        fontSize: "25px",
                      }}
                    />
                    <span>
                      {currentPage} / {totalPages}
                    </span>
                    <IoArrowForwardCircle
                      onClick={
                        currentPage < totalPages
                          ? () => setCurrentPage((prev) => prev + 1)
                          : undefined
                      }
                      style={{
                        cursor:
                          currentPage === totalPages
                            ? "not-allowed"
                            : "pointer",
                        opacity: currentPage === totalPages ? 0.5 : 1,
                        fontSize: "25px",
                      }}
                    />
                  </div>
                )}
              </div>
            ) : (
              <>
                <Swiper
                  key={windowWidth}
                  modules={[Pagination]} // Подключите модуль Pagination
                  pagination={{
                    el: ".swiper-pagination", // Класс для контейнера пагинации
                    clickable: true, // Возможность перехода по клику на точки
                  }}
                  spaceBetween={20}
                  slidesPerView={2}
                  breakpoints={{
                    325: {
                      slidesPerView: 1,
                    }
                  }}
                  className="swiper"
                >
                  <div className="posts__wrapper flex wrap">
                    {(isFetching ? [...Array(3)] : postList)?.map(
                      (post, index) =>
                        isFetching ? (
                          <PostItem isLoading={true} key={index} />
                        ) : (
                          <SwiperSlide className="swiper-slide" key={post?._id}>
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
                              direction="row"
                              isEditing={userId === post?.user?._id}
                              handlePostDelete={handlePostDelete}
                            />
                          </SwiperSlide>
                        )
                    )}
                  </div>
                </Swiper>
                <div className="swiper-pagination"></div>
              </>
            )}
          </>
        ) : (
          <div className="add-first-post">
            <h2>
              There is no post yet. You can be the first one who can post!
            </h2>
            <Link
              to={isLoggedIn ? "/create-post" : "/profile/registration"}
              className="btn btn-primary"
            >
              Create Post
            </Link>
          </div>
        )}
      {/* </div> */}
    </div>
  );
};

export default Home;
