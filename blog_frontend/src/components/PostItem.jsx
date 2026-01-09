import React from "react";
import dayjs from "dayjs";

import "../styles/postItem.scss";
import PostSkeleton from "./Skeleton";
import exploreIcon from "../assets/exploreIcon.svg";
import likeIcon from "../assets/likeIcon.svg";
import likedIcon from "../assets/likedIcon.svg";
import commentIcon from "../assets/commentIcon.svg";
import shareIcon from "../assets/shareIcon.svg";
import { Link } from "react-router-dom";


const DefaultAvatar = ({ className = "" }) => (
  <svg 
    className={className}
    viewBox="0 0 35 35" 
    fill="currentColor" // Позволяет менять цвет через CSS свойство color
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_iconCarrier">
      <path d="M17.5,16.383a8.067,8.067,0,1,1,8.067-8.067A8.076,8.076,0,0,1,17.5,16.383Zm0-13.633a5.567,5.567,0,1,0,5.567,5.566A5.573,5.573,0,0,0,17.5,2.75Z" />
      <path d="M31.477,34.75a1.25,1.25,0,0,1-1.23-1.037A12.663,12.663,0,0,0,17.5,22.852,12.663,12.663,0,0,0,4.753,33.713a1.25,1.25,0,0,1-2.464-.426A15.1,15.1,0,0,1,17.5,20.352,15.1,15.1,0,0,1,32.711,33.287a1.25,1.25,0,0,1-1.02,1.444A1.2,1.2,0,0,1,31.477,34.75Z" />
    </g>
  </svg>
);

const PostItem = ({ isLoading, post, userId }) => {
  const totalComments = post?.comments.reduce((sum, comment) => {
    return sum + 1 + (comment.replies ? comment.replies.length : 0);
  }, 0);

  if (isLoading) {
    return <PostSkeleton />;
  }

  return (
    <div className="post-item">
      <div className="post-item-wrapper">
        <div className="post-item-author">
          {
            post.user.avatarUrl ? <img className="author-avatar" src={post.user.avatarUrl} alt="avatar"/> :
            <DefaultAvatar className="author-avatar" />
          }
          <DefaultAvatar className="author-avatar" />
          <div className="author-content">
            <p className="author-name">{post.user.fullName}</p>
            <p className="post-item-topic">{post.category || 'Uncategorized'}</p>
          </div>
        </div>
        <div className="post-item-content">
          <p className="post-item-content-date">
            {dayjs(post.createdAt).format("MMMM D, YYYY")}
          </p>
          <div className="post-item-context">
            <h2 className="post-item-title">{post.title}</h2>
            <article className="post-item-description">
              {post.text.slice(0, 100) + "..."}
            </article>
          </div>
          <div className="cta-icons">
            <button className="cta-btn">
              {post.likes.some((like) => like._id === userId) ? 
              <img src={likedIcon} alt="liked-icon" /> : 
              <img src={likeIcon} alt="like-icon" />
              }
              
              {post.likes.length}
            </button>
            <button className="cta-btn">
              <img src={commentIcon} alt="comment-icon" />
              {totalComments}
            </button>
            <button className="cta-btn">
              <img src={shareIcon} alt="share-icon" />
              {post.shares.length}
            </button>
          </div>
        </div>
        <Link className="action-btn" to={`/posts/post-detail/${post._id}`}>
          View Blog <img src={exploreIcon} alt="explore" />
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
