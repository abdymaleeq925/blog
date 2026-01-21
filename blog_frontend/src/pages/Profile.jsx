import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useGetPostsQuery } from '../services/postsApi';
import { setLogOut } from '../redux/authSlice';
import { Title, PostItem } from '../components';

import { API_URL } from '../utils/constants';
import { Button } from '../components/ui/Button';

import '../styles/profile.scss';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.auth.data)
  const [postList, setPostList] = useState();
  const { data, isFetching } = useGetPostsQuery();

  const createdAt = profile?.createdAt;
  const formatedDate = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const logOut = () => {
    dispatch(setLogOut());
    window.localStorage.removeItem('token');
    navigate('/');
  }

  useEffect(() => {
    setPostList(data?.posts?.filter(post => post.user._id === profile?._id))
  }, [data, profile?._id]);

  return (
    <div className='profile'>
      <Title tag="All you need about your profile" title="Profile" />
      <div className="container">
        <div className="profile__wrapper">
          <img src={`${API_URL}${profile?.avatarUrl}`} alt="avatar" />
          <h1>{profile?.fullName}</h1>
          <p>Registration date: {formatedDate}</p>
          <Button btnName='Log Out' onClick={logOut} isYellow />
        </div>
        <h2 className="profile__posts__title">All posts</h2>
        <div className="profile__posts__wrapper">
          {
            (isFetching ? [...Array(3)] : postList)?.map((post, index) => (
              isFetching ? (<PostItem isLoading={true} key={index} />) :
                <PostItem
                  type='list'
                  isLoading={false}
                  post={post}
                  userId={profile?._id}
                />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Profile
