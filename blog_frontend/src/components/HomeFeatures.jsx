import React from 'react';

import Title from './Title';

import futureTechIcon from '../assets/icons/futureTechIcon.svg';
import researchIcon from '../assets/icons/researchIcon.svg';

const HomeFeatures = () => {
  return (
    <div>
        <Title tag="Unlock the Power of" title="FutureTech Features"/>
        <div className="homefeatures">
            <div className="homefeatures-title-1">
                <img src={futureTechIcon} alt="futureTechIcon" />
                <div className="homefeatures-text-container">
                    <h4 className="homefeatures-heading">Future Technology Blog</h4>
                    <p className="homefeatures-paragraph">Stay informed with our blog section dedicated to future technology.</p>
                </div>
            </div>
            <div className="homefeatures-description-1">
                <div className="inner-grid">
                <div className="inner-block">
                    <h4 className="inner-block-heading">Quantity</h4>
                    <p className="inner-block-paragraph">Over 1,000 articles on emerging tech trends and breakthroughs.</p>
                </div>
                <div className="inner-block">
                    <h4 className="inner-block-heading">Variety</h4>
                    <p className="inner-block-paragraph">Articles cover fields like AI, robotics, biotechnology, and more.</p>
                </div>
                <div className="inner-block">
                    <h4 className="inner-block-heading">Frequency</h4>
                    <p className="inner-block-paragraph">Fresh content added daily to keep you up to date.</p>
                </div>
                <div className="inner-block">
                    <h4 className="inner-block-heading">Authoritative</h4>
                    <p className="inner-block-paragraph">Written by our team of tech experts and industry professionals.</p>
                </div>
                </div>
            </div>
            <div className="homefeatures-title-2">
                <img src={researchIcon} alt="researchIcon" />
                <div className="homefeatures-text-container">
                    <h4 className="homefeatures-heading">Research Insights Blogs</h4>
                    <p className="homefeatures-paragraph">Dive deep into future technology concepts with our research section.</p>
                </div>
            </div>
            <div className="homefeatures-description-2">
                <div className="inner-grid">
                <div className="inner-block">
                    <h4 className="inner-block-heading">Depth</h4>
                    <p className="inner-block-paragraph">500+ research articles for in-depth understanding.</p>
                </div>
                <div className="inner-block">
                    <h4 className="inner-block-heading">Graphics</h4>
                    <p className="inner-block-paragraph">Visual aids and infographics to enhance comprehension.</p>
                </div>
                <div className="inner-block">
                    <h4 className="inner-block-heading">Trends</h4>
                    <p className="inner-block-paragraph">Explore emerging trends in future technology research.</p>
                </div>
                <div className="inner-block">
                    <h4 className="inner-block-heading">Contributors</h4>
                    <p className="inner-block-paragraph">Contributions from tech researchers and academics.</p>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeFeatures