import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from './ui/Button';

import abstractImage from '../assets/abstract.svg';
import avatar1 from '../assets/avatar1.png';
import avatar2 from '../assets/avatar2.png';
import avatar3 from '../assets/avatar3.png';
import avatar4 from '../assets/avatar4.png';

import exploreIcon from '../assets/icons/exploreIcon.svg';
import latestNewsIcon from '../assets/icons/latestNewsIcon.svg';
import expertIcon from '../assets/icons/expertIcon.svg';
import readershipIcon from '../assets/icons/readershipIcon.svg';
import exploreCircleIcon from '../assets/icons/exploreCircleIcon.svg';


const HomeBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="homebanner">
      <div className="top-section">
        <div className="left-column">
          <div className="block block-1">
            <p className="hero-text-1">Your Journey to Tomorrow Begins Here</p>
            <div className="block-1-text-container">
              <h1 className="hero-heading-1">Explore the Frontiers of Artificial Intelligence</h1>
              <p className="hero-paragraph-1">Welcome to the epicenter of AI innovation. FutureTech AI News is your passport to a world where machines think, learn, and reshape the future. Join us on this visionary expedition into the heart of AI.</p>
            </div>
          </div>
          <div className="small-blocks">
            <div className="block block-3">
              <p className="hero-heading-345">300<span>+</span></p>
              <p className="hero-parapgraph-345">Resources available</p>
            </div>
            <div className="block block-4">
              <p className="hero-heading-345">12k<span>+</span></p>
              <p className="hero-parapgraph-345">Total downloads</p>
            </div>
            <div className="block block-5">
              <p className="hero-heading-345">10k<span>+</span></p>
              <p className="hero-parapgraph-345">Active users</p>
            </div>
          </div>
        </div>
        <div className="block block-2">
          <img src={abstractImage} alt="abstract-image" className="block-2-abstract" />
          <div className="block-2-avatars">
            <img src={avatar1} alt="avatar" className="avatar-list" />
            <img src={avatar2} alt="avatar" className="avatar-list" />
            <img src={avatar3} alt="avatar" className="avatar-list" />
            <img src={avatar4} alt="avatar" className="avatar-list" />
          </div>
          <div className="block-2-text-container">
            <h4 className="hero-heading-2">Explore 1000+ resources</h4>
            <p className="hero-paragraph-2">Over 1,000 articles on emerging tech trends and breakthroughs.</p>
          </div>
          <Button btnName="Explore Resources" btnIcon={exploreIcon} onClick={() => navigate("/resources")} />

        </div>
      </div>
      <div className="bottom-section">
        <div className="block block-6">
          <img src={latestNewsIcon} alt="latest-news-icon" className="hero-icon-678" />
          <div className="hero-text-container-678">
            <div className="hero-text-678">
              <p className="hero-heading-678">Latest News Updates</p>
              <p className="hero-paragraph-678">Stay Current</p>
            </div>
            <Button btnIcon={exploreCircleIcon} onClick={() => navigate("/posts")} />
          </div>
          <p className="hero-text-678">Over 1,000 articles published monthly</p>
        </div>
        <div className="block block-7">
          <img src={expertIcon} alt="expert-icon" className="hero-icon-678" />
          <div className="hero-text-container-678">
            <div className="hero-text-678">
              <p className="hero-heading-678">Expert Contributors</p>
              <p className="hero-paragraph-678">Trusted Insights</p>
            </div>
            <Button btnIcon={exploreCircleIcon} onClick={() => navigate("/videos")} />
          </div>
          <p className="hero-text-678">20+ renowned AI experts on our team</p>
        </div>
        <div className="block block-8">
          <img src={readershipIcon} alt="readership-icon" className="hero-icon-678" />
          <div className="hero-text-container-678">
            <div className="hero-text-678">
              <p className="hero-heading-678">Global Readership</p>
              <p className="hero-paragraph-678">Worldwide Impact</p>
            </div>
            <Button btnIcon={exploreCircleIcon} onClick={() => navigate("/resources")} />
          </div>
          <p className="hero-text-678">2 million monthly readers</p>
        </div>
      </div>
    </div>
  )
}

export default HomeBanner