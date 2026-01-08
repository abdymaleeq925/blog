import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import Modal from "react-modal";

import VisibilityIcon from "@mui/icons-material/Visibility";
import ClearIcon from "@mui/icons-material/Clear";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditIcon from "@mui/icons-material/Edit";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";

import { PostItem } from "../components";
import {
  useGetOnePostQuery,
  useGetPostsQuery,
  useLikeTogglePostMutation,
  useShareTogglePostMutation,
  useToggleCommentMutation,
  useLikeToggleCommentMutation,
  useReplyToggleCommentMutation,
} from "../services/postsApi";
import { calculateReadingTime } from "../utils/readingTime";
import { generateTableOfContents, scrollToHeading } from "../utils/tableOfContents";
import "../styles/postDetail.scss";
import Comment from "../components/Comment";
import { API_URL } from "../constants";

Modal.setAppElement("#root");

const PostDetail = () => {
  const { postId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const userId = useSelector((state) => state?.auth?.data?._id);
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  const { data, refetch } = useGetOnePostQuery(postId);
  const { data: postList } = useGetPostsQuery();
  const [likeTogglePost] = useLikeTogglePostMutation();
  const [shareTogglePost] = useShareTogglePostMutation();
  const [toggleComment] = useToggleCommentMutation();
  const [likeToggleComment] = useLikeToggleCommentMutation();
  const [replyToggleComment] = useReplyToggleCommentMutation();

  const [state, setState] = useState({
    post: null,
    likes: [],
    shares: [],
    commentLikes: {},
    comment: "",
    replyComment: "",
    isModalOpen: false,
    selectedComment: null,
    isReplyOpen: {},
  });

  // Вычисляем reading time и table of contents
  const readingTime = useMemo(() => {
    return state.post?.text ? calculateReadingTime(state.post.text) : 1;
  }, [state.post?.text]);

  const tableOfContents = useMemo(() => {
    return state.post?.text ? generateTableOfContents(state.post.text) : [];
  }, [state.post?.text]);

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
    setState((prev) => ({ ...prev, post: data, likes: data?.likes || [], shares: data?.shares || [] }));
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

  const handleToggleSharePost = async (state) => {
    try {
      const response = await shareTogglePost({ postId, userId, state }).unwrap();
      if (response) {
        setState((prev) => ({ ...prev, shares: response.shares || [] }));
      } else {
        console.error("Share error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Функция для генерации ID из текста заголовка
  const generateHeadingId = (children) => {
    if (!children) return '';
    
    // Извлекаем текст из всех дочерних элементов
    const extractText = (node) => {
      if (typeof node === 'string') return node;
      if (typeof node === 'number') return String(node);
      if (Array.isArray(node)) {
        return node.map(extractText).join('');
      }
      if (node && node.props && node.props.children) {
        return extractText(node.props.children);
      }
      return '';
    };
    
    const text = extractText(children);
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Компонент для рендеринга заголовков с ID
  const components = {
    h1: ({ node, children, ...props }) => {
      const id = generateHeadingId(children);
      return <h1 id={id} {...props}>{children}</h1>;
    },
    h2: ({ node, children, ...props }) => {
      const id = generateHeadingId(children);
      return <h2 id={id} {...props}>{children}</h2>;
    },
    h3: ({ node, children, ...props }) => {
      const id = generateHeadingId(children);
      return <h3 id={id} {...props}>{children}</h3>;
    },
    h4: ({ node, children, ...props }) => {
      const id = generateHeadingId(children);
      return <h4 id={id} {...props}>{children}</h4>;
    },
    h5: ({ node, children, ...props }) => {
      const id = generateHeadingId(children);
      return <h5 id={id} {...props}>{children}</h5>;
    },
    h6: ({ node, children, ...props }) => {
      const id = generateHeadingId(children);
      return <h6 id={id} {...props}>{children}</h6>;
    },
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
                  category={post?.category}
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
                {userId === state.post?.user?._id && (
                  <button
                    className="single-post-edit-btn"
                    onClick={() => navigate(`/posts/edit/${postId}`)}
                  >
                    <EditIcon />
                    Edit Post
                  </button>
                )}
              </div>
              <div className="single-post-title">
                <h1>{state.post?.title}</h1>
              </div>
              <div className="single-post-image">
                {state.post?.imageUrl && (
                  <img
                    src={`${API_URL}${state.post?.imageUrl}`}
                    alt="post-illustration"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
              </div>
              <div className="single-post__content">
                <ReactMarkdown components={components}>{state.post?.text}</ReactMarkdown>
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
            <div className="post-sidebar">
              <div className="post-sidebar__content">
                <div className="post-meta">
                  <div className="post-meta__item">
                    <AiOutlineLike style={{ fontSize: "20px" }} />
                    <span>{state.likes?.length || 0} likes</span>
                  </div>
                  <div className="post-meta__item">
                    <CommentIcon style={{ fontSize: "20px" }} />
                    <span>{state.post?.comments?.length || 0} comments</span>
                  </div>
                  <div className="post-meta__item">
                    <ShareIcon style={{ fontSize: "20px" }} />
                    <span>{state.shares?.length || 0} shares</span>
                  </div>
                  <div className="post-meta__item">
                    <AccessTimeIcon style={{ fontSize: "20px" }} />
                    <span>{readingTime} min read</span>
                  </div>
                </div>
                {tableOfContents.length > 0 && (
                  <div className="post-toc">
                    <h3 className="post-toc__title">Table of Contents</h3>
                    <ul className="post-toc__list">
                      {tableOfContents.map((item, index) => (
                        <li
                          key={index}
                          className={`post-toc__item post-toc__item--level-${item.level}`}
                        >
                          <button
                            onClick={() => scrollToHeading(item.id)}
                            className="post-toc__link"
                          >
                            {item.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {isLoggedIn && (
                  <div className="post-sidebar__actions">
                    <button
                      className={`post-sidebar__share-btn ${state.shares?.some((share) => share._id === userId) ? 'post-sidebar__share-btn--active' : ''}`}
                      onClick={() => {
                        const hasShared = state.shares?.some((share) => share._id === userId);
                        handleToggleSharePost(!hasShared);
                      }}
                    >
                      <ShareIcon />
                      {state.shares?.some((share) => share._id === userId) ? 'Shared' : 'Share Post'}
                    </button>
                  </div>
                )}
              </div>
            </div>
            <Modal
              isOpen={state.isModalOpen}
              onRequestClose={closeModal}
              contentLabel="Post Modal"
              className="modal"
              overlayClassName="overlay"
            >
              <ClearIcon onClick={closeModal} style={{cursor: "pointer"}}/>
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
