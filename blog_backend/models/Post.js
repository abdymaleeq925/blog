import mongoose from 'mongoose';
import deepPopulateLib from 'mongoose-deep-populate';

const deepPopulate = deepPopulateLib(mongoose);

const CommentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        text: {
            type: String,
            required: true
        },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        replies: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }],
        parentCommentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
            default: null
        }
    },
    { timestamps: true}
);

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            default: ''
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        viewsCount: {
            type: Number,
            default: 0
        },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        shares: {
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }],
            default: []
        },
        anonSharesCount: {
            type: Number,
            default: 0
        },
        comments: [CommentSchema],
        imageUrl: String,
    },
    { timestamps: true }
);

const MessageSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: false,
        },
        message: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

PostSchema.plugin(deepPopulate);

const Post = mongoose.model('Post', PostSchema);
const Comment =  mongoose.model('Comment', CommentSchema);
const Message = mongoose.model('Message', MessageSchema);

export { Comment, Post, Message };