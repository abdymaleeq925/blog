import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import Modal from "react-modal";

import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import likedIcon from "../assets/icons/likedIcon.svg";
import likeIcon from "../assets/icons/likeIcon.svg";
import viewsIcon from "../assets/icons/viewsIcon.svg";
import shareIcon from "../assets/icons/shareIcon.svg";
import arrowDownIcon from "../assets/icons/arrowDownIcon.svg";


import { PostItem } from "../components";
import {
  useGetOnePostQuery,
  useGetPostsQuery,
  useLikeTogglePostMutation,
  useShareTogglePostMutation,
  useToggleCommentMutation,
  useLikeToggleCommentMutation,
  useReplyToggleCommentMutation,
  useRemovePostMutation,
} from "../services/postsApi";
import { calculateReadingTime } from "../utils/readingTime";
import { generateTableOfContents, scrollToHeading } from "../utils/tableOfContents";
import "../styles/postDetail.scss";
import Comment from "../components/Comment";
import { API_URL } from "../utils/constants";
import { Button } from "../components/ui/Button";
import exploreIcon from '../assets/icons/exploreIcon.svg';

Modal.setAppElement("#root");

const PostDetail = () => {
  const { postId } = useParams();
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
  const [removePost] = useRemovePostMutation();

  const [state, setState] = useState({
    post: null,
    commentLikes: {},
    comment: "",
    replyComment: "",
    isModalOpen: false,
    isShareModalOpen: false,
    isFullText: false,
    isReplyOpen: {},
  });

  // Текущий URL страницы и текст сообщения
const shareUrl = window.location.href;
const shareText = `Почитай мой пост: "${state.post?.title}"`;

const shareLinks = {
  whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
  telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
  gmail: `mailto:?subject=${encodeURIComponent(state.post?.title)}&body=${encodeURIComponent(shareText + " " + shareUrl)}`
};

// Функция для копирования ссылки
const copyToClipboard = () => {
  navigator.clipboard.writeText(shareUrl);
  alert("Link copied to clipboard!"); // Позже можно заменить на красивый Toast
};

  const isLiked = state.post?.likes?.some((like) => like._id === userId);

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
  };

  useEffect(() => {
    setState((prev) => ({ ...prev, post: data }));
  }, [data]);

  useEffect(() => {
    if (!data?.comments) return;
  
    const newCommentLikes = {};
  
    const collect = (comment) => {
      newCommentLikes[comment._id] = comment.likes || [];
      comment.replies?.forEach(collect);
    };
  
    data.comments.forEach(collect);
  
    setState((prev) => ({...prev, commentLikes: newCommentLikes}));
  }, [data?.comments]);

  const handleToggleLikePost = async (shouldLike) => {
    // Сохраняем старые лайки на случай ошибки
    const oldLikes = [...(state.post?.likes || [])];
    
    // Создаем новый массив лайков локально
    const newLikes = shouldLike 
      ? [...oldLikes, { _id: userId }] // Добавляем временный объект лайка
      : oldLikes.filter(like => like._id !== userId); // Удаляем лайк
  
    // Обновляем экран мгновенно
    setState(prev => ({ 
      ...prev, 
      post: { ...prev.post, likes: newLikes }
    }));
  
    try {
      const response = await likeTogglePost({ postId, userId, state: shouldLike }).unwrap();
      // Синхронизируем с финальным ответом сервера (там будут полные данные лайка)
      setState(prev => ({ 
        ...prev, 
        post: { ...prev.post, likes: response.likes }
      }));
    } catch (error) {
      // Если ошибка — откатываем изменения
      setState(prev => ({ 
        ...prev, 
        post: { ...prev.post, likes: oldLikes }
      }));
      console.error("Error liking post:", error);
    }
  };

  const handleToggleSharePost = async () => {
    // 1. Сразу открываем модалку
    setState(prev => ({ ...prev, isShareModalOpen: true }));
  
    try {
      // 2. Отправляем запрос. Сервер вернет ОБНОВЛЕННЫЙ объект поста
      const updatedPost = await shareTogglePost({ postId, userId }).unwrap();
      
      // 3. ОБЯЗАТЕЛЬНО обновляем локальный стейт результатом с сервера
      setState(prev => ({ 
        ...prev, 
        post: updatedPost 
      }));
      
    } catch (error) {
      console.error("Error updating share count:", error);
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
                  (reply) => reply._id !== replyId
                ) || [],
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
    <div className="single-post">
      <div className="single-post-heading-container">
        {state.post?.imageUrl && (
          <img
            className="single-post-image"
            src={`${API_URL}${state.post?.imageUrl}`}
            alt="post-illustration"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        )}
        <h1 className="single-post-title">{state.post?.title}</h1>
      </div>
      <div className="container">
        <div className="single-post__wrapper">
          <div className="single-post__content">
          <div className={`content-clipper ${!state.isFullText ? 'clipped' : ''}`}>
            <ReactMarkdown components={components}>
              {state.post?.text}
            </ReactMarkdown>
            
            {!state.isFullText && (
              <div className="read-more-overlay">
                <button 
                  className="action-btn" 
                  onClick={() => setState(prev => ({ ...prev, isFullText: true }))}
                >
                  Read Full Blog <img src={arrowDownIcon} alt="arrow"/>
                </button>
              </div>
            )}
          </div>
            <div className="comments">
            <h2>Comments</h2>
            {isLoggedIn && (
              <div className="comments-input-box">
                <textarea
                  id="newComment"
                  spellCheck="false"
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
                  className="action-btn"
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
          <div className="single-post__details">
            <div className="cta-counters">
              <div 
                className="counts"
                onClick={() => {
                  isLoggedIn 
                    ? handleToggleLikePost(!isLiked) 
                    : (window.location.href = "/profile/registration");
                }}
                >
                <img src={isLiked ? likedIcon : likeIcon} alt="like" />
                <span>{state.post?.likes?.length || 0}</span>
              </div>
              <div className="counts">
                
                    <img src={viewsIcon} alt="views-icon"/> <span>{state.post?.viewsCount}</span>
                
              </div>
              <div className="counts" onClick={() => { handleToggleSharePost(); }}>
                
                  <img src={shareIcon} alt="share-icon"/> <span>{(state.post?.shares?.length || 0) + (state.post?.anonSharesCount || 0)}</span>
                
              </div>
            </div>
            <div className="info">
              <div className="info-text">
                <p>Publication Date</p>
                <span>
                  {new Date(state.post?.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="info-text">
                <p>Category</p>
                <span>{state.post?.category}</span>
              </div>
              <div className="info-text">
                <p>Reading Time</p>
                <span>{readingTime} min</span>
              </div>
              <div className="info-text">
                <p>Author Name</p>
                <span>{state.post?.user?.fullName}</span>
              </div>
            </div>
            {tableOfContents.length > 0 && (
                <div className="table-contents">
                  <p>Table of Contents</p>
                  <ol className="content-list">
                    {tableOfContents.map((item, index) => (
                      <li
                        key={index}
                        className={`content-title ${item.level}`}
                      >
                        <button
                          onClick={() => scrollToHeading(item.id)}
                          className="content-link"
                        >
                          {item.title}
                        </button>
                      </li>
                    ))}
                  </ol>
                </div>
            )}
            {userId === state.post?.user?._id && (
                <div className="post-cta">
                  <button
                  className="action-btn"
                  onClick={() => navigate(`/posts/edit/${postId}`)}
                  >
                    <EditIcon />
                    Edit Post
                  </button>
                  <button
                  className="action-btn"
                  onClick={() => setState((prev) => ({ ...prev, isModalOpen: !prev.isModalOpen }))}
                >
                  <DeleteIcon />
                  Delete Post
                </button>
                </div>
              )}
          </div>
        </div>
        <div className="similar-posts">
            <div className="recommended-posts-title">
              <h2>Similar News</h2>
              <Button onClick={() => navigate('/news')} btnName="View All News" btnIcon={exploreIcon}/>
            </div>
            <div className="recommended-posts-list">
            {recentList?.map((post) => (
              <PostItem 
              type="list"
                key={post._id} 
                isLoading={false} 
                userId={userId} 
                post={post} 
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
            <h2>Are you sure you want to delete this post?</h2>
            <p>"{state.post?.title}"</p>
            <div className="modal-buttons">
              <button
                className="btn"
                onClick={() => {
                  removePost(postId);
                  closeModal();
                  navigate('/');
                }}
              >
                Yes
              </button>
              <button className="btn" onClick={() => closeModal()}>No</button>
            </div>
          </Modal>
          <Modal
  isOpen={state.isShareModalOpen}
  onRequestClose={() => setState(prev => ({ ...prev, isShareModalOpen: false }))}
  className="modal share-modal"
  overlayClassName="overlay"
>
  <div className="modal-header">
    <h2>Share this post</h2>
    <ClearIcon onClick={() => setState(prev => ({ ...prev, isShareModalOpen: false }))} />
  </div>

  <div className="share-grid">
    <a href={shareLinks.telegram} target="_blank" rel="noreferrer" className="share-option">
      <TelegramIcon className="tg-icon" />
      <span>Telegram</span>
    </a>
    <a href={shareLinks.whatsapp} target="_blank" rel="noreferrer" className="share-option">
      <WhatsAppIcon className="wa-icon" />
      <span>WhatsApp</span>
    </a>
    <a href={shareLinks.gmail} className="share-option">
      <EmailIcon className="mail-icon" />
      <span>Gmail</span>
    </a>
    <div className="share-option" onClick={copyToClipboard}>
      <ContentCopyIcon />
      <span>Copy Link</span>
    </div>
  </div>
</Modal>
      </div>
    </div>
  );
};

export default PostDetail;
