import React from 'react';
import { Link } from 'react-router-dom';
import { GoArrowUpRight } from 'react-icons/go';

import { useRemovePostMutation } from '../services/postsApi';
import '../styles/postItem.css';
import PostSkeleton from './Skeleton';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

const PostItem = ({ title, author, date, text, tags, image, views, size, direction, isLoading, id, isEditing, handlePostDelete, location }) => {
    const colorClass = ['color1', 'color2', 'color3', 'color4', 'color5', 'color6'];
    const getRandomColor = () => {
        return colorClass[Math.floor(Math.random() * colorClass.length)];
    }

    const [removePost] = useRemovePostMutation();

    const deletePost = async() => {
        if (window.confirm("Are you sure you want delete this post?")){
            try {
                await removePost(id);
                handlePostDelete(id);
            } catch(error) {
                console.error(error);
            }
            
        }
    }

    if (isLoading) { return <PostSkeleton /> }

    return (
        <div className={`post-item ${size} ${direction}`}>
            { isEditing && 
                (<div className="edit-btns">
                    <Link to={`/posts/edit/${id}/`}><ModeEditOutlineIcon/></Link>
                    <button onClick={deletePost}><DeleteIcon/></button>
                </div>)
            }
            <div className={`post-item__image ${location}`}>
                <img src={`https://blog-backend-m5ss.onrender.com${image}`} alt="" />
            </div>
            <div className={`post-item__info ${location}`}>
                <div className="post-item__info-author">
                    <span>{author}</span>
                    <span>{new Date(date).toLocaleDateString()}</span>
                </div>
                <Link to={`/posts/post-detail/${id}`} className="post-item__info-title">
                    <h3 className="title-md">{title}</h3>
                    <GoArrowUpRight />
                </Link>
                <div className="post-item__info-text">{text}</div>
                <div className="post-item__info-tags">
                    {
                        tags?.map((tag, index) => <span key={index} className={getRandomColor()}>{tag.name}</span>)
                    }
                </div>
                <div className="post-item__info-actions">
                    <span><VisibilityIcon/>{views}</span>
                </div>
            </div>
        </div>
    )
}

export default PostItem
