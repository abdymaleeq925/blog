import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoSunnyOutline } from 'react-icons/io5';
import { FaRegMoon } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/themeSlice';
import '../styles/header.css';

const Header = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme.value);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.data);
  
  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__logo">
            {isLoggedIn && <Link to={`/profile/${user?._id}`}>{user?.fullName}</Link>}
          </div>
          <div className="header__navs">
            <ul className="header__navs-list cl-effect-16">
              <a href="/" data-hover="Home">Home</a>
              <a href="/posts" data-hover="Posts">Posts</a>
              {
                isLoggedIn ? (
                  <>
                    <li className='create btn btn-primary'><Link to="/create-post">Create Post</Link></li>
                    <li className='btn-secondary'><Link to="/create-post">+</Link></li>
                  </>
                ) : (
                  <li><Link className='btn btn-outlined' to="profile/registration">Log In</Link></li>
                )
              }
            </ul>
            <div className="switch" onClick={handleToggle}>
              <div className="switch-toggles">
                <div className="day"><IoSunnyOutline/></div>
                <div className="night"><FaRegMoon/></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
