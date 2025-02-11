import mongoose from 'mongoose';

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
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            text: { type: String, required: true },
            likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
            createdAt: { type: Date, default: Date.now }
        }]
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
        tags: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tag'
        }],
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
        comments: [CommentSchema],
        imageUrl: String,
    },
    { timestamps: true }
);

export default mongoose.model('Post', PostSchema);