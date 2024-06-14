import React, { useState, useEffect } from 'react';

import { useGetOnePostQuery } from '../services/postsApi';
import { useParams } from 'react-router-dom';

import VisibilityIcon from '@mui/icons-material/Visibility';

const PostDetail = () => {
    const {postId} = useParams();
    const {data} = useGetOnePostQuery(postId);
    const [post, setPost] = useState();

    useEffect(() => {
        setPost(data)
    }, [data])
  return (
    <div>
        <div className="single-post">
            <div className="container">
                <div className="single-post__wrapper">
                    <div className="single-post-heading">
                        <div className="single-post-author">
                            <span>{post?.user?.fullName},</span>
                            <span>{new Date(post?.createdAt).toLocaleDateString()}</span>
                            <h4><VisibilityIcon/> {post?.viewsCount}</h4>
                        </div>
                    </div>
                    <div className="single-post-title">
                        <h1>{post?.title}</h1>
                    </div>
                    <div className="single-post-image">
                        <img src={`http://localhost:4444${post?.imageUrl}`} alt="post-illustration" />
                    </div>
                    <div className="single-post__content">
                        <p>{post?.text}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostDetail
