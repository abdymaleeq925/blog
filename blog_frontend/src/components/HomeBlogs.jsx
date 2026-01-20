import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { IoArrowForwardCircle } from "react-icons/io5";
import { IoArrowBackCircle } from "react-icons/io5";

import { useGetPostsQuery } from "../services/postsApi";

import { Button } from "./ui/Button";

import Title from "./Title";
import PostItem from "./PostItem";

const HomeBlogs = () => {

  const filters = [
    "All",
    "Quantum",
    "Biotechnology",
    "Healthcare",
    "Environment",
    "Other"
  ];

  const [active, setActive] = useState("All");
  const [postList, setPostList] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const userId = useSelector((state) => state?.auth?.data?._id);

  const { data, isFetching } = useGetPostsQuery();

  const postsPerPage = 3;
  const totalPages =
    filteredPosts?.length > postsPerPage
      ? Math.ceil(filteredPosts?.length / postsPerPage)
      : 1;
  const currentData = filteredPosts?.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  useEffect(() => {
    setPostList(data?.posts);
  }, [data?.posts]);

  useEffect(() => {
    if (active === "All") {
      setFilteredPosts(postList || []);
    } else {
      setFilteredPosts(
        postList?.filter((post) => post.category === active) || []
      );
    }
    setCurrentPage(1);
  }, [active, postList]);

  return (
    <div className="homeblogs">
      <Title
        tag="A Knowledge Treasure Trove"
        title="Explore FutureTech's In-Depth Blog Posts"
        button={{ text: "View All Blogs", href: "blogs" }}
      />

      <div className="homeblogs-filter">
        {filters.map((item, index) => (
          <Button
            key={index}
            className={`filter-btn ${active === item ? "active" : ""}`}
            btnName={item}
            onClick={() => setActive(item)}
          />
        ))}
      </div>
      <div className="homeblogs-blogs">
        {isFetching ? (
          [...Array(3)].map((_, index) => (
            <PostItem key={index} isLoading={true} />
          ))
        ) : currentData && currentData.length > 0 ? (
          currentData.map((post) => (
            <PostItem
              key={post._id}
              isLoading={false}
              userId={userId}
              post={post}
            />
          ))
        ) : (
          <div className="posts-empty">
            <h3>No posts found</h3>
            <p>Try change the category or check back later.</p>
          </div>
        )}
        {filteredPosts?.length > 3 && (
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
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                opacity: currentPage === totalPages ? 0.5 : 1,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeBlogs;
