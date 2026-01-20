import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { IoSunnyOutline } from 'react-icons/io5';
import { FaRegMoon } from "react-icons/fa";
import Icon from '../assets/icons/icon.svg';

import { Button } from '../components/ui/Button';
import { toggleTheme } from '../redux/themeSlice';
import { setLogOut } from '../redux/authSlice';

import '../styles/header.scss';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useSelector((state) => state.theme.value);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.data);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    dispatch(setLogOut());
    window.localStorage.removeItem('token');
    setIsDropdownOpen(false);
    navigate('/');
  }

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__logo">
            <img src={Icon} alt="website-icon" />
            <h2>FutureTech</h2>
          </div>
          <ul className="header__navs">
            <li>
              <NavLink to="/" end>Home</NavLink>
            </li>
            <li>
              <NavLink to="/posts">Posts</NavLink>
            </li>
            <li>
              <NavLink to="/videos">Videos</NavLink>
            </li>
            <li>
              <NavLink to="/resources">Resources</NavLink>
            </li>
          </ul>
          <div className="header__cta">
            {
              isLoggedIn ? (
                <div className='header__cta-list' ref={dropdownRef}>
                  <Button btnName="Create Post" onClick={() => navigate("/create-post")} isYellow />
                  <div className="dropdown">
                    <Button className="dropdown__toggle" btnName={user?.fullName} onClick={toggleDropdown} isYellow />
                    <ul className={`dropdown__menu ${isDropdownOpen ? 'active' : ''}`}>
                      <li>
                        <NavLink to={`/profile/${user?._id}`} onClick={() => setIsDropdownOpen(false)}>
                          My Profile
                        </NavLink>
                      </li>
                      <li>
                        <button onClick={handleLogout} className="logout-btn">
                          Log Out
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <Button btnName="Log In" onClick={() => navigate("profile/registration")} isYellow />
              )
            }
            <div className="switch" onClick={handleToggle}>
              <div className="switch-toggles">
                <div className="day"><IoSunnyOutline /></div>
                <div className="night"><FaRegMoon /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
