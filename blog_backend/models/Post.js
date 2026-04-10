import mongoose from 'mongoose';
import deepPopulateLib from 'mongoose-deep-populate';
import { CommentSchema } from './Comment.js';

const deepPopulate = deepPopulateLib(mongoose);

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    shares: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }],
      default: [],
    },
    anonSharesCount: {
      type: Number,
      default: 0,
    },
    comments: [CommentSchema],
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

PostSchema.plugin(deepPopulate);

const Post = mongoose.model('Post', PostSchema);

export default Post;