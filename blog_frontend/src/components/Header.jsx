import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { IoSunnyOutline, IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    dispatch(setLogOut());
    window.localStorage.removeItem('token');
    setIsDropdownOpen(false);
    closeMenu();
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
          <div className="header__logo" onClick={() => navigate("/")}>
            <img src={Icon} alt="website-icon" />
            <h2>FutureTech</h2>
          </div>
          <ul className={`header__navs ${isMenuOpen ? 'active' : ''}`}>
            <li>
              <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/posts" onClick={closeMenu}>Posts</NavLink>
            </li>
            <li>
              <NavLink to="/videos" onClick={closeMenu}>Videos</NavLink>
            </li>
            <li>
              <NavLink to="/resources" onClick={closeMenu}>Resources</NavLink>
            </li>
            <li className="mobile-cta">
              {isLoggedIn ? (
                <div className="mobile-cta__wrapper">
                  <Button btnName="Create Post" onClick={() => { navigate("/create-post"); closeMenu(); }} isYellow />
                  <div className="dropdown">
                    <Button className="dropdown__toggle" btnName={user?.fullName} onClick={toggleDropdown} isYellow />
                    <ul className={`dropdown__menu ${isDropdownOpen ? 'active' : ''}`}>
                      <li>
                        <NavLink to={`/profile/${user?._id}`} onClick={() => { setIsDropdownOpen(false); closeMenu() }}>
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
                <Button btnName="Log In" onClick={() => { navigate("profile/registration"); closeMenu(); }} isYellow />
              )}
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
            <div className={`header__menu-icon ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
              {isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
            </div>
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
