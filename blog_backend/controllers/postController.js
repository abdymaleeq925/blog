import mongoose from "mongoose";

import { Post, Comment } from "../models/Post.js";

export const create = async (request, response) => {
  try {
    const doc = new Post({
      title: request.body.title,
      text: request.body.text,
      description: request.body.description,
      category: request.body.category || '',
      imageUrl: request.body.imageUrl,
      user: request.userId,
      shares: [],
    });
    const post = await doc.save();

    return response.status(201).json(post);
  } catch (error) {
    response.status(500).json({ message: "Create error" });
  }
};

export const getAll = async (request, response) => {
  try {
    const posts = await Post.find()
      .populate("user")
      .populate("likes", "fullName")
      .populate("shares", "fullName");
    if (!posts) {
      response.status(404).json({ message: "Posts not found" });
    }
    return response.json({ posts });
  } catch (error) {
    response.status(404).json({ message: "Not found" });
  }
};

export const getOne = async (request, response) => {
  const postId = request.params.id;
  try {
    const updatedPost = await Post.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        new: true,
      }
    )
      .populate("user")
      .populate("likes", "fullName")
      .populate("shares", "fullName")
      .populate({
        path: "comments",
        populate: [
          { path: "user", select: "fullName" },
          { path: "likes", select: "fullName" },
          {
            path: "replies",
            populate: [
              { path: "user", select: "fullName" },
              { path: "likes", select: "fullName" },
              {
                path: "replies",
                populate: [
                  { path: "user", select: "fullName" },
                  { path: "likes", select: "fullName" },
                  {
                    path: "replies",
                    populate: [
                      { path: "user", select: "fullName" },
                      { path: "likes", select: "fullName" },
                      {
                        path: "replies",
                        populate: [
                          { path: "user", select: "fullName" },
                          { path: "likes", select: "fullName" },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });
    response.json(updatedPost);
  } catch (error) {
    response.status(401).json({ message: "Error" });
  }
};

export const update = async (request, response) => {
  const postId = request.params.id;
  try {
    await Post.updateOne(
      { _id: postId },
      {
        title: request.body.title,
        text: request.body.text,
        description: request.body.description,
        category: request.body.category || '',
        imageUrl: request.body.imageUrl,
      }
    );
    response.json({ success: true });
  } catch (error) {
    response.status(401).json({ message: "Error" });
  }
};

export const remove = async (request, response) => {
  const postId = request.params.id;
  try {
    const post = await Post.findOneAndDelete({ _id: postId });
    if (!post) {
      return response.status(404).json({ message: "Not found" });
    }
    return response.status(200).json({ success: true });
  } catch (error) {
    return response.status(401).json({ message: "Delete error" });
  }
};


export const likeTogglePost = async (request, response) => {
  try {
    const { postId } = request.params;
    const { userId, state } = request.body;
    const objectedUserId = new mongoose.Types.ObjectId(userId);

    const likeState = state
      ? { $addToSet: { likes: objectedUserId } }
      : { $pull: { likes: objectedUserId } };

    const post = await Post.findByIdAndUpdate(postId, likeState, {
      new: true,
    }).populate("likes", "fullName");
    if (!post) {
      return response.status(404).json({ message: "Post not found" });
    }
    return response.json(post);
  } catch (error) {
    response.status(500).json({ message: error.message || "Server error" });
  }
};

export const toggleComment = async (request, response) => {
  try {
    const { postId } = request.params;
    const { userId, commentText, booleanState, commentId } = request.body;
    const objectedUserId = new mongoose.Types.ObjectId(userId);
    const objectedComment = new mongoose.Types.ObjectId(commentId);
    const commentState = booleanState
      ? { $push: { comments: { user: objectedUserId, text: commentText } } }
      : { $pull: { comments: { _id: objectedComment } } };
    const post = await Post.findByIdAndUpdate(postId, commentState, {
      new: true,
    }).populate({
      path: "comments.user",
      select: "fullName _id",
    });
    if (!post) {
      return response.status(404).json({ message: "Post not found" });
    }
    return response.json(post);
  } catch (error) {
    response.status(500).json({ message: error.message || "Server error" });
  }
};

export const likeToggleComment = async (request, response) => {
  try {
    const { postId, commentId } = request.params;
    const { userId, booleanState, parentComment } = request.body;

    const objectedUserId = new mongoose.Types.ObjectId(userId);
    const objectedCommentId = new mongoose.Types.ObjectId(commentId);

    const commentLikeState = booleanState
      ? { $addToSet: { "comments.$.likes": objectedUserId } }
      : { $pull: { "comments.$.likes": objectedUserId } };

    const replyLikeState = booleanState
      ? { $addToSet: { likes: objectedUserId } }
      : { $pull: { likes: objectedUserId } };

    const post = parentComment
      ? await Comment.findOneAndUpdate(
          { _id: objectedCommentId },
          replyLikeState,
          { new: true }
        ).populate({
          path: "likes replies.likes",
          select: "fullName _id",
        })
      : await Post.findOneAndUpdate(
          { _id: postId, "comments._id": commentId },
          commentLikeState,
          { new: true }
        ).populate({
          path: "comments.likes comments.replies.likes",
          select: "fullName _id",
        });

    if (!post) {
      return response
        .status(404)
        .json({ message: "Post or comment not found" });
    }

    return response.json(post);
  } catch (error) {
    console.error("Error in likeToggleComment:", error);
    response.status(500).json({ message: "Like comment error" });
  }
};

export const shareTogglePost = async (request, response) => {
  try {
    const { postId } = request.params;
    const { userId, state } = request.body;
    
    let updateAction;

    if(userId) {
      const objectedUserId = new mongoose.Types.ObjectId(userId);
      updateAction = { $addToSet: { shares: objectedUserId }}
    } else {
      updateAction = { $inc: { anonSharesCount: 1 } };
    }

    const post = await Post.findByIdAndUpdate(postId, updateAction, {
      new: true,
    }).populate("shares", "fullName");
    if (!post) {
      return response.status(404).json({ message: "Post not found" });
    }
    return response.json(post);
  } catch (error) {
    response.status(500).json({ message: error.message || "Server error" });
  }
};

export const replyToggleComment = async (request, response) => {
  try {
    const { postId, commentId } = request.params;
    const { userId, commentText, booleanState, replyId } = request.body;

    const post = await Post.findById(postId).populate({
      path: "comments",
      populate: {
        path: "replies",
        populate: {
          path: "replies",
          populate: {
            path: "replies",
            populate: {
              path: "replies",
            },
          },
        },
      },
    });

    if (!post) {
      return response.status(404).json({ message: "Post not found" });
    }

    // Recursive function to find out the comment by ID
    const findCommentRecursively = (comments, targetId) => {
      for (const comment of comments) {
        if (comment._id.toString() === targetId) {
          return comment;
        }
        if (comment.replies && comment.replies.length > 0) {
          const found = findCommentRecursively(comment.replies, targetId);
          if (found) {
            return found;
          }
        }
      }
      return null;
    };

    // Looking for parent comment recursively
    const parentComment = findCommentRecursively(post.comments, commentId);
    if (!parentComment) {
      return response.status(404).json({ message: "Comment not found" });
    }

    if (booleanState) {
      const newReply = new Comment({
        user: new mongoose.Types.ObjectId(userId),
        text: commentText,
        parentCommentId: replyId ? replyId : commentId,
      });

      await newReply.save();

      // Choose where to add the comment
      const parent = findCommentRecursively(
        post.comments,
        replyId || commentId
      );
      if (!parent) {
        await Comment.deleteOne({ _id: newReply._id });
        return response
          .status(404)
          .json({ message: "Nested comment not found" });
      }

      parent.replies.push(newReply._id);
      // await parent.save();
    } else { 

    const commentToDelete = findCommentRecursively(post.comments, replyId || commentId);
    if (!commentToDelete) {
        return response.status(404).json({ message: 'Comment not found' });
    }

    // 🛠 Функция рекурсивного удаления вложенных комментариев
    const deleteCommentRecursively = async (comment) => {
        for (const reply of comment.replies) {
            const nestedComment = await Comment.findById(reply);
            if (nestedComment) {
                await deleteCommentRecursively(nestedComment);
            }
        }
        await Comment.deleteOne({ _id: comment._id });
    };

    await deleteCommentRecursively(commentToDelete);

    // 🛠 Удаляем ссылку на удаленный комментарий у родителя
    const parent = findCommentRecursively(post.comments, commentToDelete.parentCommentId);
    if (parent) {
        parent.replies = parent.replies.filter(reply => reply.toString() !== commentToDelete._id.toString());
        // await parent.save();
    }
    }

    await post.save();
    return response.json(post);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Reply error", error: error.message });
  }
};

