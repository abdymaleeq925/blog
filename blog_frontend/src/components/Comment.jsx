import React from "react";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import ClearIcon from "@mui/icons-material/Clear";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

const Comment = ({
  comment,
  userId,
  isLoggedIn,
  handleLikeToggleComment,
  handleReplyToggle,
  handleReply,
  state,
  setState,
}) => {
  const openModal = (comment) => {
    setState((prev) => ({ ...prev, selectedComment: comment }));
    setState((prev) => ({ ...prev, isModalOpen: !prev.isModalOpen }));
  };
  return (
    <div className="comments-box" key={comment?._id}>
      <div className="comment-header">
        {comment?.user?.fullName}{" "}
        {comment?.user?._id === userId && (
          <ClearIcon
            onClick={() => openModal(comment)}
            style={{ cursor: "pointer" }}
          />
        )}
      </div>
      <div className="comment-text">
        <ReactMarkdown>{comment?.text}</ReactMarkdown>
        {comment?.createdAt && (
          <p className="date">
            {format(new Date(comment?.createdAt), "HH:mm")}{" "}
            {format(new Date(comment?.createdAt), "dd MMM yyyy")}
          </p>
        )}
      </div>
      <div className="comment-actions">
        <div className="comment-like">
          {state.commentLikes[comment?._id] &&
          state.commentLikes[comment?._id]?.some(
            (like) => like?._id === userId
          ) ? (
            <AiFillLike
              onClick={() =>
                handleLikeToggleComment(
                  false,
                  comment?._id,
                  comment?.parentCommentId !== null ? true : false
                )
              }
              style={{ cursor: "pointer", fontSize: "25px" }}
            />
          ) : (
            <AiOutlineLike
              onClick={() =>
                isLoggedIn
                  ? handleLikeToggleComment(
                      true,
                      comment?._id,
                      comment?.parentCommentId !== null ? true : false
                    )
                  : (window.location.href = "/profile/registration")
              }
              style={{ cursor: "pointer", fontSize: "25px" }}
            />
          )}
          {state.commentLikes[comment?._id]?.length < 2 ? (
            state.commentLikes[comment?._id]?.map((like, index) => (
              <p key={index} style={{ margin: "0" }}>
                {like?.fullName}
                {index !== state.commentLikes[comment?._id]?.length - 1 && ","}
              </p>
            ))
          ) : (
            <p style={{ margin: "0" }}>
              {" "}
              {state.commentLikes[comment?._id]?.length} people liked this post{" "}
            </p>
          )}
        </div>
        <button className="btn-reply" onClick={() => isLoggedIn ? (handleReplyToggle(comment?._id)) : (window.location.href = "/profile/registration")}>Reply</button>
      </div>
      {state.isReplyOpen[comment?._id] && (
        <div className="comments-input-box">
          <textarea
            id="newComment2"
            placeholder="Write your comment..."
            value={state.replyComment}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                replyComment: e.target.value,
              }))
            }
          ></textarea>
          <div className="comment-buttons">
            <button
              className="submit-button"
              onClick={() =>
                handleReply(
                  true,
                  comment?.parentCommentId || comment?._id,
                  comment?.parentCommentId ? comment?._id : null
                )
              }
            >
              Send
            </button>
            <button
              className="submit-button"
              onClick={() => handleReplyToggle(comment?._id)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {comment?.replies?.length > 0 &&
        comment?.replies.map((reply) => (
          <Comment
            key={reply._id}
            comment={reply}
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
  );
};

export default Comment;
