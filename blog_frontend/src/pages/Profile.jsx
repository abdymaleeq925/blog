import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useGetPostsQuery, useRemovePostMutation } from '../services/postsApi';
import { setLogOut } from '../redux/authSlice';
import { PostItem } from '../components';
import '../styles/profile.scss';

const Profile = () => {
  
  const profile = useSelector((state) => state.auth.data)
  const { data, isFetching } = useGetPostsQuery();
  const [postList, setPostList] = useState();
  const createdAt = profile?.createdAt;
  const formatedDate = new Date(createdAt).toLocaleDateString();

  const [removePost] = useRemovePostMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const logOut = () => {
    dispatch(setLogOut());
    window.localStorage.removeItem('token');
    navigate('/');
  }

  useEffect(() => {
    setPostList(data?.posts?.filter(post => post.user._id === profile._id))
  },[data, profile._id]);

  const handlePostDelete = async(id) => {
    try {
      if(window.confirm('Are you sure you want to delete?')) {
        console.log(`Deleting post with id ${id}`);
        await removePost(id).unwrap();
        setPostList(prevList => {
          console.log('Post list before deleting: ', prevList);
          const updatedList = prevList.filter(post => post._id !== id);
          console.log('Post list after deleting: ', updatedList);
          return updatedList
        })
      }
    } catch(error) {
      console.error('Failed to delete post: ', error);
    }
  }

  return (
    <div className='profile'>
      <div className="container">
        <div className="profile__wrapper">
          <h1 className="h1">{profile?.fullName}</h1>
          <p>Registered at: {formatedDate}</p>
          <button className='btn btn-primary' type="button" onClick={logOut}>Log Out</button>
            <div className="posts__wrapper flex wrap">
              {
                (isFetching ? [...Array(3)] : postList)?.map((post, index) => (
                  isFetching ? (<PostItem isLoading={true} key={index}/>) :
                    <PostItem
                      isLoading = { false }
                      key = {post?._id}
                      id = {post?._id}
                      title = {post?.title}
                      author = {post?.user.fullName}
                      date = {post?.createdAt}
                      text = {post?.text}
                      tags = {post?.tags}
                      views = {post?.viewsCount}
                      image = {post?.imageUrl}
                      size = "post-item--sm"
                      direction = "column"
                      isEditing = {true}
                      handlePostDelete={handlePostDelete}
                    />
                ))
              }
            </div>      
        </div>
      </div>
    </div>
  )
}

export default Profile
