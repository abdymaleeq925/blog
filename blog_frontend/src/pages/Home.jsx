import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";


import { PostItem, HomeBlogs, HomeResources, HomeTestimonials } from "../components";

import "../styles/home.scss";
import HomeBanner from "../components/HomeBanner";
import HomeFeatures from "../components/HomeFeatures";

const Home = () => {
  

  
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);



  return (
    <div>
      
        <HomeBanner/>
        <HomeFeatures/>
        <HomeBlogs/>
        <HomeResources/>
        <HomeTestimonials/>

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
    </div>
  );
};

export default Home;
