import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IoArrowForwardCircle } from "react-icons/io5";
import { IoArrowBackCircle } from "react-icons/io5";
import Title from "./Title";
import { useGetPostsQuery } from "../services/postsApi";
import PostItem from "./PostItem";
import { useSelector } from "react-redux";

const HomeBlogs = () => {
  const filters = [
    "All",
    "Quantum Computing",
    "AI Ethics",
    "Space Exploration",
    "Biotechnology",
    "Renewable Energy",
  ];

  const [active, setActive] = useState("All");
  const [postList, setPostList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();
  const userId = useSelector((state) => state?.auth?.data?._id);
  const { data, isFetching, refetch } = useGetPostsQuery();

  const postsPerPage = 3;
  const totalPages =
    postList?.length > postsPerPage
      ? Math.ceil(postList?.length / postsPerPage)
      : 1;
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

  const handlePostDelete = (id) => {
    setPostList(postList.filter((post) => post._id !== id));
  };

  return (
    <div className="homeblogs">
      <Title
        tag="A Knowledge Treasure Trove"
        title="Explore FutureTech's In-Depth Blog Posts"
        button={{ text: "View All Blogs", href: "blogs" }}
      />

      <div className="homeblogs-filter">
        {filters.map((item) => (
          <button
            key={item}
            className={`filter-btn ${active === item ? "active" : ""}`}
            onClick={() => setActive(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="homeblogs-blogs">
        {(isFetching ? [...Array(3)] : currentData)?.map((post, index) =>
          isFetching ? (
            <PostItem
              key={index}
              post={post}
              isLoading={true}
              handlePostDelete={handlePostDelete}
            />
          ) : (
            <PostItem
              isLoading={false}
              post={post}
              isEditing={userId === post?.user?._id}
              handlePostDelete={handlePostDelete}
            />
          )
        )}
        {postList?.length > 3 && (
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
                fontSize: "45px",
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
                fontSize: "45px",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeBlogs;
