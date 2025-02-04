import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { PostItem } from "../components";
import { useGetOnePostQuery, useGetPostsQuery } from "../services/postsApi";
import '../styles/postDetail.css';

const PostDetail = () => {
  const { postId } = useParams();
  const { data, refetch } = useGetOnePostQuery(postId);
  const { data: postList } = useGetPostsQuery();
  const location = useLocation();
  const [post, setPost] = useState();

  const recentList = postList ? postList?.posts.length > 3 ? postList?.posts.slice(-3).reverse() : [...postList?.posts]?.reverse() : [];

  useEffect(() => {
    setPost(data);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [location.pathname, refetch]);
  return (
    <div>
      <div className="single-post">
        <div className="container">
          <div className="post-detail__wrapper">
            <div className="recent-posts">
              <h1 className="h1">Recent blogs</h1>
              {recentList?.map((post) => (
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
                  size="post-item--lg"
                  direction="column"
                  location="post-img"
                />
              ))}
            </div>
            <div className="single-post__wrapper">
              <div className="single-post-heading">
                <div className="single-post-author">
                  <span>{post?.user?.fullName},</span>
                  <span>{new Date(post?.createdAt).toLocaleDateString()}</span>
                  <h4>
                    <VisibilityIcon /> {post?.viewsCount}
                  </h4>
                </div>
              </div>
              <div className="single-post-title">
                <h1>{post?.title}</h1>
              </div>
              <div className="single-post-image">
                <img
                  src={`http://localhost:4444${post?.imageUrl}`}
                  alt="post-illustration"
                />
              </div>
              <div className="single-post__content">
                <p>{post?.text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
