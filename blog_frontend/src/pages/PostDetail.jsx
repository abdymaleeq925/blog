import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import Modal from "react-modal";

import VisibilityIcon from "@mui/icons-material/Visibility";
import ClearIcon from "@mui/icons-material/Clear";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";

import { PostItem } from "../components";
import {
  useGetOnePostQuery,
  useGetPostsQuery,
  useLikeTogglePostMutation,
  useToggleCommentMutation,
  useLikeToggleCommentMutation,
  useReplyToggleCommentMutation,
} from "../services/postsApi";
import "../styles/postDetail.css";
import Comment from "../components/Comment";

Modal.setAppElement("#root");

const PostDetail = () => {
  const { postId } = useParams();
  const location = useLocation();
  const userId = useSelector((state) => state?.auth?.data?._id);
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  const { data, refetch } = useGetOnePostQuery(postId);
  const { data: postList } = useGetPostsQuery();
  const [likeTogglePost] = useLikeTogglePostMutation();
  const [toggleComment] = useToggleCommentMutation();
  const [likeToggleComment] = useLikeToggleCommentMutation();
  const [replyToggleComment] = useReplyToggleCommentMutation();

  const [state, setState] = useState({
    post: null,
    likes: [],
    commentLikes: {},
    comment: "",
    replyComment: "",
    isModalOpen: false,
    selectedComment: null,
    isReplyOpen: {},
  });

  const recentList = postList
    ? postList?.posts.filter((el) => el._id !== postId).length > 3
      ? postList?.posts
          .filter((el) => el._id !== postId)
          .slice(-3)
          .reverse()
      : [...postList?.posts]?.filter((el) => el._id !== postId).reverse()
    : [];

  const closeModal = () => {
    setState((prev) => ({ ...prev, isModalOpen: !prev.isModalOpen }));
    setState((prev) => ({ ...prev, selectedComment: null }));
  };

  useEffect(() => {
    setState((prev) => ({ ...prev, post: data, likes: data?.likes }));
  }, [data]);

  useEffect(() => {
    if (data) {
      // Recursive function for likes
      const collectLikesRecursively = (comment, likesMap) => {
        // Adding current comment likes
        likesMap[comment._id] = comment.likes || [];

        // Go through all replies
        if (comment.replies && comment.replies.length > 0) {
          comment.replies.forEach((reply) => {
            collectLikesRecursively(reply, likesMap);
          });
        }
      };

      // For like storage
      const allLikesMap = {};

      // Go through all main comments
      data.comments.forEach((comment) => {
        collectLikesRecursively(comment, allLikesMap);
      });

      // Updating state
      setState((prev) => ({ ...prev, commentLikes: allLikesMap }));
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [location.pathname, refetch]);

  const handleToggleLikePost = async (state) => {
    try {
      const response = await likeTogglePost({ postId, userId, state }).unwrap();
      if (response) {
        setState((prev) => ({ ...prev, likes: response.likes }));
      } else {
        console.error("Like error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleToggleComment = async (booleanState, commentId) => {
    try {
      const response = await toggleComment({
        postId,
        userId,
        commentText: state.comment,
        booleanState,
        commentId,
      }).unwrap();
      if (response) {
        setState((prev) => ({
          ...prev,
          post: {
            ...prev.post,
            comments: booleanState
              ? [...(prev.comments || []), response.comment]
              : (prev.comments || [])?.filter(
                  (comment) => comment?._id !== commentId
                ),
          },
          comment: "",
          isModalOpen: false,
        }));
      } else {
        console.error("Dislike error");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      refetch();
    }
  };

  const handleLikeToggleComment = async (
    booleanState,
    commentId,
    parentComment
  ) => {
    try {
      const response = await likeToggleComment({
        postId,
        userId,
        commentId,
        booleanState,
        parentComment,
      }).unwrap();
      if (response) {
        console.log("check", response);
        const updatedComment = parentComment
          ? response
          : response?.comments?.find((comment) => comment._id === commentId);
        console.log("updatedComment", updatedComment);
        if (updatedComment) {
          setState((prev) => ({
            ...prev,
            commentLikes: {
              ...prev.commentLikes,
              [commentId]: updatedComment.likes || [],
            },
          }));
        }
      } else {
        console.error("Comment Like error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleReplyToggle = (commentId) => {
    setState((prevState) => ({
      ...prevState,
      isReplyOpen: prevState.isReplyOpen[commentId]
        ? {}
        : { [commentId]: true },
    }));
  };

  const handleReply = async (booleanState, commentId, replyId) => {
    try {
      const response = await replyToggleComment({
        postId,
        commentId,
        userId,
        commentText: state.replyComment,
        booleanState,
        replyId,
      });

      if (response) {
        // Обновляем массив replies в зависимости от booleanState
        setState((prevPost) => {
          const updatedComments = prevPost?.comments?.map((comment) => {
            if (comment._id === commentId) {
              // Если комментарий был удален, удаляем его из replies
              return {
                ...comment,
                replies: comment.replies.filter(
                  (reply) => reply._id !== commentId
                ),
              };
            }
            return comment;
          });

          const updatedIsReplyOpen = { ...prevPost.isReplyOpen };
          updatedIsReplyOpen[commentId] = false; // Закрываем textarea для commentId
          if (replyId) {
            updatedIsReplyOpen[replyId] = false; // Закрываем textarea для replyId
          }

          return {
            ...prevPost,
            comments: updatedComments,
            replyComment: "",
            isReplyOpen: updatedIsReplyOpen,
          };
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      refetch();
    }
  };

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
                  <span>{state.post?.user?.fullName},</span>
                  <span>
                    {new Date(state.post?.createdAt).toLocaleDateString()}
                  </span>
                  <h4>
                    <VisibilityIcon /> {state.post?.viewsCount}
                  </h4>
                </div>
              </div>
              <div className="single-post-title">
                <h1>{state.post?.title}</h1>
              </div>
              <div className="single-post-image">
                <img
                  src={`https://blog-backend-m5ss.onrender.com${state.post?.imageUrl}`}
                  alt="post-illustration"
                />
              </div>
              <div className="single-post__content">
                <ReactMarkdown>{state.post?.text}</ReactMarkdown>
              </div>
              <div className="likes">
                <h2>Likes</h2>
                <div className="likes-amount">
                  {state.likes?.some((like) => like._id === userId) ? (
                    <AiFillLike
                      onClick={() => handleToggleLikePost(false)}
                      style={{ cursor: "pointer", fontSize: "25px" }}
                    />
                  ) : (
                    <AiOutlineLike
                      onClick={() =>
                        isLoggedIn
                          ? handleToggleLikePost(true)
                          : (window.location.href = "/profile/registration")
                      }
                      style={{ cursor: "pointer", fontSize: "25px" }}
                    />
                  )}
                  {state.likes?.length < 4 ? (
                    state.likes.map((like, index) => (
                      <p key={index} style={{ margin: "0" }}>
                        {like.fullName}
                        {index !== state.likes.length - 1 && ","}
                      </p>
                    ))
                  ) : (
                    <p> {state.likes?.length} people liked this post </p>
                  )}
                </div>
              </div>
              <div className="comments">
                <h2>Comments</h2>
                {isLoggedIn && (
                  <div className="comments-input-box">
                    <textarea
                      id="newComment"
                      placeholder="Write your comment..."
                      value={state.comment}
                      onChange={(e) =>
                        setState((prev) => ({
                          ...prev,
                          comment: e.target.value,
                        }))
                      }
                    ></textarea>
                    <button
                      className="submit-button"
                      onClick={() => handleToggleComment(true)}
                    >
                      Send
                    </button>
                  </div>
                )}
                {state.post?.comments.length > 0 &&
                  state.post?.comments?.map((comment) => (
                    <Comment
                      key={comment?._id}
                      comment={comment}
                      userId={userId}
                      isLoggedIn={isLoggedIn}
                      handleLikeToggleComment={handleLikeToggleComment}
                      handleReplyToggle={handleReplyToggle}
                      handleReply={handleReply}
                      state={state}
                      setState={setState}
                    />
                  ))}
              </div>
            </div>
            <Modal
              isOpen={state.isModalOpen}
              onRequestClose={closeModal}
              contentLabel="Post Modal"
              className="modal"
              overlayClassName="overlay"
            >
              <ClearIcon onClick={closeModal} />
              <h2>Are you sure you want to delete this comment?</h2>
              <p>"{state.selectedComment?.text}"</p>
              <div className="modal-buttons">
                <button
                  className="btn btn-primary btn-modal"
                  onClick={() => {
                    // If it is 1st level of comment
                    if (!state.selectedComment?.parentCommentId) {
                      handleToggleComment(false, state.selectedComment?._id); // For the 1st level
                    } else {
                      handleReply(
                        false,
                        state.selectedComment?.parentCommentId,
                        state.selectedComment?._id
                      ); // For replies
                    }
                    closeModal();
                  }}
                >
                  Yes
                </button>
                <button className="btn btn-primary btn-modal" onClick={() => closeModal()}>No</button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
