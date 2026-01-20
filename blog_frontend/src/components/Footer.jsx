import React from 'react'
import { Link } from 'react-router-dom';

import { FaLinkedin, FaGithub, FaTelegram } from "react-icons/fa";

const New = () => {
  return <span className="new-badge">New</span>;
};

const Footer = () => {
  const footerItems = [
    {
      itemTitle: "Home",
      items: ["Features", "Posts", "Resources", "Testimonials", "Contact Us", "Newsletter"]
    },
    {
      itemTitle: "News",
      items: ["Trending Stories", "Videos", "Technology", "Health", "Environment", "Politics"]
    },
    {
      itemTitle: "Blogs",
      items: ["Quantum Computing", "AI Ethics", "Space Exploration", "Biotechnology", "Renewable Energy", "Biohacking"]
    },
    {
      itemTitle: "Podcasts",
      items: ["AI Revolution", "TechTalk AI", "AI Conversations"]
    },
    {
      itemTitle: "Resources",
      items: ["Whitepaper", "Ebooks", "Reports", "Reasearch Papers"]
    }
  ];

  return (
    <div className='footer'>
      <div className="container">
        <div className="footer-wrapper">
          <div className="cta">
            {footerItems.map(group => (
              <div className="cta-wrapper" key={group.itemTitle}>
                <p className="cta-title">{group.itemTitle}</p>
                <div className="cta-items">
                  {
                    group.items.map(item => (
                      <div className="cta-items-wrapper" key={item}>
                        <Link className="footer-cta" to={`/${item.replace(" ", "-").toLowerCase()}`}>{item} {["Resources", "Biotechnology", "AI Revolution"].includes(item) && <New />}</Link>
                      </div>
                    ))
                  }
                </div>
              </div>
            ))}
          </div>
          <div className="privacy">
            <div className="terms-policy">
              <p>Terms & Condition</p>
              <p>Policy</p>
            </div>
            <div className="contact-social-btns">
              <a href="https://linkedin.com/in/abdymalik-batyrkulov" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="social-icon" />
              </a>

              <a href="https://github.com/abdymaleeq925" target="_blank" rel="noopener noreferrer">
                <FaGithub className="social-icon" />
              </a>

              <a href="https://t.me/naintufaiv55" target="_blank" rel="noopener noreferrer">
                <FaTelegram className="social-icon" />
              </a>
            </div>
            <p>© 2024 FutureTech. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
