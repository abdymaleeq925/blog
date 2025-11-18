import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoSunnyOutline } from 'react-icons/io5';
import { FaRegMoon } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/themeSlice';
import Icon from '../assets/icon.svg';
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
            <img src={Icon} alt="icon"/>
            <h2>FutureTech</h2>
          </div>
          <ul className="header__navs">
            <a href="/" data-hover="Home">Home</a>
            <a href="/news" data-hover="Posts">News</a>
            <a href="/podcasts" data-hover="Posts">Podcasts</a>
            <a href="/resources" data-hover="Posts">Resources</a>
          </ul>
          
          <div className="header__cta">
          {
                isLoggedIn ? (
                  <>
                    <li className='btn-primary'><Link to="/create-post">Create Post</Link></li>
                    <li className='btn-primary'><Link to="/create-post">+</Link></li>
                  </>
                ) : (
                  <Link className='btn' to="profile/registration">Log In</Link>
                )
              }
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
