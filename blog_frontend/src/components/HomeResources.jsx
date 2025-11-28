import React from 'react'
import { Button } from './ui/Button';
import Title from './Title'
import avatar1 from '../assets/avatar1.png';
import avatar2 from '../assets/avatar2.png';
import avatar3 from '../assets/avatar3.png';
import avatar4 from '../assets/avatar4.png';
import avatar5 from '../assets/avatar5.png';
import avatar6 from '../assets/avatar6.png';
import avatar7 from '../assets/avatar7.png';
import avatar8 from '../assets/avatar8.png';
import ebooks from '../assets/ebooks.svg';
import ebooksImage from '../assets/ebooksImage.png';
import whitepapers from '../assets/whitepapers.svg';
import whitepapersImage from '../assets/whitepapersImage.png';
import exploreIcon from '../assets/exploreIcon.svg';
import previewIcon from '../assets/previewIcon.svg';
import { useNavigate } from 'react-router-dom';


const HomeResources = () => {
  const navigate = useNavigate();
  return (
    <div>
        <Title
            tag="Your Gateway to In-Depth Information"
            title="Unlock Valuable Knowledge with FutureTech's Resources"
            button={{ text: "View All Resources", href: "resources" }}
      />

      <div className='homeresources'>
        <div>
        <div className="homeresources-title-1">
          <div className="homeresources-title-container">
            <img src={ebooks} alt="ebooks" />
            <div className="homeresources-title-content">
              <h4 className='homeresources-heading'>Ebooks</h4>
              <p className='homeresources-paragraph'>Explore our collection of ebooks covering a wide spectrum of future technology topics.</p>
            </div>
            <Button onClick={()=> navigate("/ebooks")} btnName="Download Ebooks Now" btnIcon={exploreIcon}/>
          </div>
          <div className="homeresources-title-downloads">
            <div className="homeresources-content">
              <p className='homeresources-heading'>Downloaded By</p>
              <p className='homeresources-text'>10k + Users</p>
            </div>
            <div className="homeresources-downloaded-avatars">
              <img src={avatar1} alt="avatar" className="avatar-list" />
              <img src={avatar2} alt="avatar" className="avatar-list" />
              <img src={avatar3} alt="avatar" className="avatar-list" />
              <img src={avatar4} alt="avatar" className="avatar-list" />
            </div>
          </div>
        </div>
        <div className="homeresources-description-1">
          <div className="homeresources-description-info-1">
            <p className="homeresources-description-heading-1">Variety of Topics</p>
            <p className="homeresources-description-text-1">Topics include AI in education (25%), renewable energy (20%), healthcare (15%), space exploration (25%), and biotechnology (15%).</p>
          </div>
          <img src={ebooksImage} alt="ebooks-image" />
          <div className="homeresources-description-info-2">
            <div className="homeresources-total">
              <p className="homeresources-description-heading-2">Total Ebooks</p>
              <p className="homeresources-description-text-2">Over 100 ebooks</p>
            </div>
            <div className="homeresources-downloads">
              <div className="homeresources-downloads-content">
                <p className="homeresources-description-heading-2">Download Formats</p>
                <p className="homeresources-description-text-2">PDF format for access.</p>
              </div>
              <Button onClick={()=> navigate("/ebooks")} btnName="Preview" btnIcon={previewIcon}/>
            </div>
          </div>
          <div className="homeresources-description-info-3">
            <p className="homeresources-description-heading-3">Average Author Expertise</p>
            <p className="homeresources-description-text-3">Ebooks are authored by renowned experts with an average of 15 years of experience</p>
          </div>
        </div>
        </div>
        <div>
        <div className="homeresources-title-2">
        <div className="homeresources-title-container">
            <img src={whitepapers} alt="whitepapers" />
            <div className="homeresources-title-content">
              <h4 className='homeresources-heading'>Whitepapers</h4>
              <p className='homeresources-paragraph'>Dive into comprehensive reports and analyses with our collection of whitepapers. </p>
            </div>
            <Button onClick={()=> navigate("/whitepapers")} btnName="Download Whitepapers Now" btnIcon={exploreIcon}/>
          </div>
          <div className="homeresources-title-downloads">
            <div className="homeresources-content">
              <p className='homeresources-heading'>Downloaded By</p>
              <p className='homeresources-text'>10k + Users</p>
            </div>
            <div className="homeresources-downloaded-avatars">
              <img src={avatar5} alt="avatar" className="avatar-list" />
              <img src={avatar6} alt="avatar" className="avatar-list" />
              <img src={avatar7} alt="avatar" className="avatar-list" />
              <img src={avatar8} alt="avatar" className="avatar-list" />
            </div>
          </div>
        </div>
        <div className="homeresources-description-2">
        <div className="homeresources-description-info-1">
            <p className="homeresources-description-heading-1">Topics Coverage</p>
            <p className="homeresources-description-text-1">Whitepapers cover quantum computing (20%), AI ethics (15%), space mining prospects (20%), AI in healthcare (15%), and renewable energy strategies (30%).</p>
          </div>
          <img src={whitepapersImage} alt="whitepapers-image" />
          <div className="homeresources-description-info-2">
            <div className="homeresources-total">
              <p className="homeresources-description-heading-2">Total Whitepapers</p>
              <p className="homeresources-description-text-2">Over 50 whitepapers</p>
            </div>
            <div className="homeresources-downloads">
              <div className="homeresources-downloads-content">
                <p className="homeresources-description-heading-2">Download Formats</p>
                <p className="homeresources-description-text-2">PDF format for access.</p>
              </div>
              <Button onClick={()=> navigate("/ebooks")} btnName="Preview" btnIcon={previewIcon}/>
            </div>
          </div>
          <div className="homeresources-description-info-3">
            <p className="homeresources-description-heading-3">Average Author Expertise</p>
            <p className="homeresources-description-text-3">Whitepapers are authored by subject matter experts with an average of 20 years of experience.</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default HomeResources