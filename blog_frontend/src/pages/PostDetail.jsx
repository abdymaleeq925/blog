import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { format } from 'date-fns'; 

import { PostItem } from "../components";
import {
  useGetOnePostQuery,
  useGetPostsQuery,
  useLikePostMutation,
  useDislikePostMutation,
  useAddCommentMutation,
} from "../services/postsApi";
import "../styles/postDetail.css";

const PostDetail = () => {
  const { postId } = useParams();
  const location = useLocation();
  const userId = useSelector(state => state?.auth?.data?._id);

  const { data, refetch } = useGetOnePostQuery(postId);
  const { data: postList } = useGetPostsQuery();
  const [likePost] = useLikePostMutation();
  const [dislikePost] = useDislikePostMutation();
  const [addComment] = useAddCommentMutation();

  console.log('postList', postList)

  const [post, setPost] = useState();
  const [likes, setLikes] = useState([]);
  const [comment, setComment] = useState("");
  const recentList = postList
    ? postList?.posts.filter(el => el._id !== postId).length > 3
      ? postList?.posts.filter(el => el._id !== postId).slice(-3).reverse()
      : [...postList?.posts]?.filter(el => el._id !== postId).reverse()
    : [];

  useEffect(() => {
    setPost(data);
    setLikes(post?.likes);
  }, [data, post]);
  console.log(post)
  useEffect(() => {
    refetch();
  }, [location.pathname, comment, refetch]);

  const handleLike = async () => {
    try {
      const response = await likePost({postId, userId}).unwrap();
      if (response) {
        setLikes(response.likes); // Обновляем список лайков
      } else {
        console.error("Like error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await dislikePost({postId, userId}).unwrap();
      if(response) {
        setLikes(response.likes);
      } else {
        console.error("Dislike error");
      } 
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const handleAddComment = async () => {
    try {
      const response = await addComment({postId, userId, commentText: comment}).unwrap();
      if(response) {
        console.log('response is successfull', response);
        setPost(prevPost => ({
          ...prevPost,
          comments: [...prevPost.comments, response.comment]
        }));
        setComment("");
      } else {
        console.error("Dislike error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

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
              <div className="likes">
                <h2>Likes</h2>
                <div className="likes-amount">
                  {likes?.some(like => like._id === userId) ? <AiFillLike onClick={handleDislike} style={{cursor: "pointer", fontSize: "25px"}} /> : <AiOutlineLike onClick={handleLike} style={{cursor: "pointer", fontSize: "25px"}} />}
                  {likes?.length < 4 ? (
                    likes.map((like, index) => (
                      <p key={index}>{like.fullName}{index !== likes.length-1 && ','}</p>
                    ))
                  ): `${likes?.length} people liked this post` }
                </div>
              </div>
              <div className="comments">
                <h2>Comments</h2>
                <div className="comments-input-box">
                  <textarea id="newComment" placeholder="Write your comment..." value={comment} onChange={e => setComment(e.target.value)}></textarea>
                  <button className="submit-button" onClick={handleAddComment}>Send</button>
                </div>
                {post?.comments.length > 0 && (
                  post?.comments?.map((comment, index) => (
                    <div className="comments-box" key={index}>
                      <div className="comment-header">{comment?.user.fullName}</div>
                      <div className="comment-text">
                        {comment?.text}
                        {comment?.createdAt && (
                          <p>{format(new Date(comment?.createdAt), "HH:mm")} {format(new Date(comment?.createdAt), "dd MMM yyyy")}</p>
                        )}
                      </div>
                      <div className="comment-actions">
                        <button onclick="likeComment()">👍 Like</button>
                        <button onclick="replyComment()">💬 Reply</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
