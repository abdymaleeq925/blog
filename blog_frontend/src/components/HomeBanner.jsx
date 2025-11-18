import React from 'react';
import abstractImage from '../assets/abstract.svg';
import avatar1 from '../assets/avatar1.png';
import avatar2 from '../assets/avatar2.png';
import avatar3 from '../assets/avatar3.png';
import avatar4 from '../assets/avatar4.png';
import exploreIcon from '../assets/exploreIcon.svg';
import latestNewsIcon from '../assets/latestNewsIcon.svg';
import expertIcon from '../assets/expertIcon.svg';
import readershipIcon from '../assets/readershipIcon.svg';
import exploreCircleIcon from '../assets/exploreCircleIcon.svg';

const HomeBanner = () => {
  return (
    <>
        <div class="top-section">
          <div class="left-column">
            <div class="block block-1">
              <p className="hero-text-1">Your Journey to Tomorrow Begins Here</p>
              <div className="block-1-text-container">
                <h1 className="hero-heading-1">Explore the Frontiers of Artificial Intelligence</h1>
                <p className="hero-paragraph-1">Welcome to the epicenter of AI innovation. FutureTech AI News is your passport to a world where machines think, learn, and reshape the future. Join us on this visionary expedition into the heart of AI.</p>
              </div>
            </div>
            <div class="small-blocks">
              <div class="block block-3">
                <p className="hero-heading-345">300<span>+</span></p>
                <p className="hero-parapgraph-345">Resources available</p>
              </div>
              <div class="block block-4">
                <p className="hero-heading-345">12k<span>+</span></p>
                <p className="hero-parapgraph-345">Total downloads</p>
              </div>
              <div class="block block-5">
                <p className="hero-heading-345">10k<span>+</span></p>
                <p className="hero-parapgraph-345">Active users</p>
              </div>
            </div>
          </div>
          <div class="block block-2">
            <img src={abstractImage} alt="abstractImage" className="block-2-abstract" />
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
            <button className="action-btn">
              Explore Resources <img src={exploreIcon} alt="explore"/>
            </button>
          </div>
        </div>
        <div class="bottom-section">
          <div class="block block-6">
            <img src={latestNewsIcon} alt="latest-news-icon" className="hero-icon-678"/>
            <div className="hero-text-container-678">
              <div className="hero-text-678">
                <p className="hero-heading-678">Latest News Updates</p>
                <p className="hero-paragraph-678">Stay Current</p>
              </div>
              <button><img src={exploreCircleIcon} alt="explore"/></button>
            </div>
            <p className="hero-text-678">Over 1,000 articles published monthly</p>
          </div>
          <div class="block block-7">
          <img src={expertIcon} alt="expert-icon" className="hero-icon-678"/>
            <div className="hero-text-container-678">
              <div className="hero-text-678">
                <p className="hero-heading-678">Expert Contributors</p>
                <p className="hero-paragraph-678">Trusted Insights</p>
              </div>
              <button><img src={exploreCircleIcon} alt="explore"/></button>
            </div>
            <p className="hero-text-678">50+ renowned AI experts on our team</p>
          </div>
          <div class="block block-8">
          <img src={readershipIcon} alt="readership-icon" className="hero-icon-678"/>
            <div className="hero-text-container-678">
              <div className="hero-text-678">
                <p className="hero-heading-678">Global Readership</p>
                <p className="hero-paragraph-678">Worldwide Impact</p>
              </div>
              <button><img src={exploreCircleIcon} alt="explore"/></button>
            </div>
            <p className="hero-text-678">2 million monthly readers</p>
          </div>
        </div>
    </>
  )
}

export default HomeBanner