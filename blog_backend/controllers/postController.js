import mongoose from 'mongoose';

import Post from '../models/Post.js';
import Tag from '../models/Tag.js';

export const create = async(request, response) => {
    try {
        const doc = new Post ({
            title: request.body.title,
            text: request.body.text,
            tags: request.body.tags,
            imageUrl: request.body.imageUrl,
            user: request.userId
        });
        const post = await doc.save();

        return response.status(201).json(post);
    } catch(error){
        response.status(500).json({ message: 'Create error' });
    }
}

export const getAll = async(request, response) => {
    try{
        const posts = await Post.find().populate('user').populate('tags');
        if (!posts) {
            response.status(404).json({ message: 'Posts not found' });
        }
        return response.json({posts});
    } catch(error){
        response.status(404).json({ message: 'Not found' });
    }
}

export const getOne = async(request, response) => {
    const postId = request.params.id;
    try{
        const updatedPost = await Post.findOneAndUpdate(
        {
            _id: postId
        },
        {
            $inc: {viewsCount : 1} 
        },
        {
            new: true
        }
        ).populate('user').populate("likes", "fullName").populate("comments.user", "fullName");
        response.json(updatedPost);
    } catch(error){
        response.status(401).json({ message: 'Error' });
    }
}

export const update = async(request, response) => {
    const postId = request.params.id;
    try {
        await Post.updateOne(
            { _id : postId },
            { 
                title: request.body.title,
                text: request.body.text,
                tags: request.body.tags,
                imageUrl: request.body.imageUrl
            }
        );
        response.json({success: true});
    } catch(error){
        response.status(401).json({ message: 'Error' });
    }
}

export const remove = async(request, response) => {
    const postId = request.params.id;
    try {
        const post = await Post.findOneAndDelete({ _id : postId });
        if (!post) {
            return response.status(404).json({ message: 'Not found' })
        }
        return response.status(200).json({success: true});
    } catch(error){
        return response.status(401).json({ message: 'Delete error' });
    }
}

export const createTag = async(request, response) => {
    try {
        const doc = new Tag ({
            name: request.body.name
        });
        const tags = await doc.save();

        return response.status(201).json(tags);
    } catch(error){
        response.status(500).json({ message: error });
    }
}

export const getAllTags = async(request, response) => {
    try{
        const tags = await Tag.find();
        if (!tags) {
            response.status(404).json({ message: 'Tags not found' });
        }
        return response.status(200).json({tags});
    } catch(error){
        response.status(404).json({ message: 'Not found' });
    }
}

export const likePost = async (request, response) => {
    try {
        const {postId} = request.params;
        const {userId} = request.body;
        const objectId = new mongoose.Types.ObjectId(userId);
        const post = await Post.findByIdAndUpdate(
            postId,
            { $addToSet: { likes: objectId } },
            { new: true }
        ).populate("likes", "fullName");
        if (!post) {
            return response.status(404).json({ message: 'Post not found' });
        }

        return response.json(post);
    } catch (error) {
        response.status(500).json({ message: error.message || 'Server error' });
    }
};

export const dislikePost = async (request, response) => {
    try {
        const post = await Post.findByIdAndUpdate(
            request.params.postId,
            { $pull: { likes: new mongoose.Types.ObjectId(request.body.userId) } }, // Убираем ID пользователя из массива лайков
            { new: true }
        ).populate('likes', 'fullName');
        if (!post) {
            return response.status(404).json({ message: 'Post not found' });
        }
        return response.json(post);
    } catch (error) {
        response.status(500).json({ message: error.message || 'Server error' });
    }
};

export const addComment = async (request, response) => {
    try {
        console.log('body', request.body);
        const post = await Post.findByIdAndUpdate(
            request.params.postId,
            { $push: { comments: { user: new mongoose.Types.ObjectId(request.body.userId), text: request.body.commentText } } },
            { new: true }
        ).populate({
            path: 'comments.user',
            select: 'fullName _id'
        });
        if (!post) {
            return response.status(404).json({ message: 'Post not found' });
        }
        return response.json(post);
    } catch (error) {
        response.status(500).json({ message: error.message || 'Server error' });
    }
};

export const deleteComment = async (request, response) => {
    try {
        const post = await Post.findByIdAndUpdate(
            request.params.postId,
            { $pull: { comments: { _id: request.params.commentId, user: request.userId } } }, // Удаляет только комментарии пользователя
            { new: true }
        );

        if (!post) {
            return response.status(404).json({ message: 'Post not found' });
        }

        return response.json(post);
    } catch (error) {
        response.status(500).json({ message: 'Delete comment error' });
    }
};

export const likeComment = async (request, response) => {
    try {
        const post = await Post.findOneAndUpdate(
            { _id: request.params.postId, "comments._id": request.params.commentId },
            { $addToSet: { "comments.$.likes": request.userId } },
            { new: true }
        );

        if (!post) {
            return response.status(404).json({ message: 'Post or comment not found' });
        }

        return response.json(post);
    } catch (error) {
        response.status(500).json({ message: 'Like comment error' });
    }
};

export const dislikeComment = async (request, response) => {
    try {
        const post = await Post.findOneAndUpdate(
            { _id: request.params.postId, "comments._id": request.params.commentId },
            { $pull: { "comments.$.likes": request.userId } },
            { new: true }
        );

        if (!post) {
            return response.status(404).json({ message: 'Post or comment not found' });
        }

        return response.json(post);
    } catch (error) {
        response.status(500).json({ message: 'Unlike comment error' });
    }
};

export const replyToComment = async (request, response) => {
    try {
        const post = await Post.findOneAndUpdate(
            { _id: request.params.postId, "comments._id": request.params.commentId },
            { 
                $push: { 
                    "comments.$.replies": { 
                        user: request.userId, 
                        text: request.body.text 
                    } 
                } 
            },
            { new: true }
        );

        if (!post) {
            return response.status(404).json({ message: 'Post or comment not found' });
        }

        return response.json(post);
    } catch (error) {
        response.status(500).json({ message: 'Reply error' });
    }
};
