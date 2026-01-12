import React from 'react'

const New = () => {
  return <span className="new-badge">New</span>;
};

const Footer = () => {
  const footerItems = [
    {
      itemTitle: "Home",
      items: ["Features", "Blogs", "Resources", "Testimonials", "Contact Us", "Newsletter"]
    },
    {
      itemTitle: "News",
      items: ["Trending Stories", "Featured Videos", "Technology", "Health", "Environment", "Politics"]
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
  const host = window.location.host;
  
  return (
    <div className='footer'>
      <div className="container">
        <div className="footer-wrapper">
          <div className="cta">
            {footerItems.map((group, itemIndex) => (
              <div className="cta-wrapper" key={group.itemTitle}>
                <p className="cta-title">{group.itemTitle}</p>
                <div className="cta-items">
                  {
                    group.items.map(item => (
                      <div className="cta-items-wrapper" key={item}>
                        <a className="footer-cta" href={`${host}/${item}`}>{item} {["Resources", "Biotechnology", "AI Revolution"].includes(item) && <New/>}</a>      
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
            <p>© 2024 FutureTech. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
