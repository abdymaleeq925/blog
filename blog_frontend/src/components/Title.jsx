import React from 'react';
import exploreIcon from '../assets/icons/exploreIcon.svg';
import '../styles/index.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';

const Title = ({ tag, title, button = null, buttons = null, activeCategory, onCategoryChange }) => {
  const navigate = useNavigate();

  return (

    <div className="title-wrapper">
      <div className="title-text-container">
        <p className="title-tag">{tag}</p>
        <h1 className="title-text">{title}</h1>
      </div>
      {button ? (
        <Button onClick={() => navigate(`/${button.href}`)} btnName={button.text} btnIcon={exploreIcon} />
      ) : buttons ? (
        <div className="title-buttons">
          {buttons.map((item, index) => (
          <Button
            key={index}
            className={`filter-btn ${activeCategory === item ? "active" : ""}`}
            btnName={item}
            onClick={() => onCategoryChange(item)}
          />
        ))}
        </div>
      ) : (
        null
      )}
    </div>

  )
}

export default Title