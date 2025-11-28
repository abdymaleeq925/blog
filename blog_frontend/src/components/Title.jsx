import React from 'react';
import exploreIcon from '../assets/exploreIcon.svg';
import '../styles/index.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';

const Title = ({tag, title, button = null}) => {
  const navigate = useNavigate();
  return (
    
      <div className="title-wrapper">
        <div className="title-text-container">
          <p className="title-tag">{tag}</p>
          <h1 className="title-text">{title}</h1>
        </div>
        {button && (
          <Button onClick={() => navigate(`/${button.href}`)} btnName={button.text} btnIcon={exploreIcon}/>
        )}
      </div>
    
  )
}

export default Title