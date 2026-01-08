import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { useGetPostsQuery, useRemovePostMutation } from '../services/postsApi';
import { setLogOut } from '../redux/authSlice';
import { Title, PostItem } from '../components';
import '../styles/profile.scss';

const Profile = () => {
  
  const profile = useSelector((state) => state.auth.data)
  const { data, isFetching, refetch } = useGetPostsQuery();
  const [postList, setPostList] = useState();
  const createdAt = profile?.createdAt;
  const formatedDate = new Date(createdAt).toLocaleDateString();

  const [removePost] = useRemovePostMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  console.log("PROFILE", profile)

  const logOut = () => {
    dispatch(setLogOut());
    window.localStorage.removeItem('token');
    navigate('/');
  }
  
  useEffect(() => {
    setPostList(data?.posts?.filter(post => post.user._id === profile?._id))
  },[data, profile?._id]);

  useEffect(() => {
      refetch()
    }, [location.pathname, refetch])

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
      <Title
          title="Profile"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          strokeColor="#ff0000"
          minFontSize={36}
        />
      <div className="container">
        <div className="profile__wrapper">
          <img src={`http://localhost:4444${profile?.avatarUrl}`} alt="avatar" />
          <h1 className="h1">{profile?.fullName}</h1>
          <p>Registration date: {formatedDate}</p>
          <button className='btn btn-primary' type="button" onClick={logOut}>Log Out</button>    
        </div>
        <h2 className="posts">All posts</h2>
        <div className="posts__wrapper flex">
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
                  category = {post?.category}
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
  )
}

export default Profile
