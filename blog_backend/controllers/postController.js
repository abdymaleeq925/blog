import { request } from 'express';
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
        ).populate('user')
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