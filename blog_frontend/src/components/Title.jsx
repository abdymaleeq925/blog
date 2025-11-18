import React from 'react';
import exploreIcon from '../assets/exploreIcon.svg';
import '../styles/index.scss';

const Title = ({tag, title, button=""}) => {
  return (
    
      <div className="title-wrapper">
        <div className="title-text-container">
          <p className="title-tag">{tag}</p>
          <h1 className="title-text">{title}</h1>
        </div>
        {button && (
          <button className="action-btn">{button} <img src={exploreIcon} alt="explore"/></button>
        )}
      </div>
    
  )
}

export default Title