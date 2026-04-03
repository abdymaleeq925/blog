import React from "react";
import { Helmet } from 'react-helmet-async';

import { HomeBlogs, HomeResources, HomeTestimonials, HomeBanner, HomeFeatures } from "../components";
import "../styles/home.scss";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>FutureTech Blog</title>
        <meta name="description" content="Welcome to the epicenter of AI innovation. FutureTech AI News is your passport to a world where machines think, learn, and reshape the future." />
      </Helmet>
      <HomeBanner />
      <HomeFeatures />
      <HomeBlogs />
      <HomeResources />
      <HomeTestimonials />
    </div>
  );
};

export default Home;
