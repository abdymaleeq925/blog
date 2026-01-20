import React from "react";

import { HomeBlogs, HomeResources, HomeTestimonials, HomeBanner, HomeFeatures } from "../components";
import "../styles/home.scss";

const Home = () => {
  return (
    <div>
      <HomeBanner />
      <HomeFeatures />
      <HomeBlogs />
      <HomeResources />
      <HomeTestimonials />
    </div>
  );
};

export default Home;
