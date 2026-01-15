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
    "Healthcare",
    "Biotechnology",
    "Renewable Energy",
  ];

  const [active, setActive] = useState("All");
  const [postList, setPostList] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();
  const userId = useSelector((state) => state?.auth?.data?._id);
  const { data, isFetching, refetch } = useGetPostsQuery();

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
    setCurrentPage(1); // Сбрасываем страницу при смене фильтра
  }, [active, postList]);

  useEffect(() => {
    refetch();
  }, [refetch, location.pathname]);

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
      {isFetching ? (
  // Состояние 1: Загрузка (Скелетоны)
  [...Array(3)].map((_, index) => (
    <PostItem key={index} isLoading={true} userId={userId} />
  ))
) : currentData && currentData.length > 0 ? (
  // Состояние 2: Посты есть (Отрисовка)
  currentData.map((post) => (
    <PostItem 
      key={post._id} 
      isLoading={false} 
      userId={userId} 
      post={post} 
    />
  ))
) : (
  // Состояние 3: Постов нет (Заглушка)
  <div className="posts-empty">
    <h3>No posts found</h3>
    <p>Try changing the category or check back later.</p>
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
