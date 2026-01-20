import React from 'react'
import { Rating } from '@mui/material';
import { Star, StarBorder, StarHalf } from '@mui/icons-material';

import Title from './Title'

import avatar9 from '../assets/avatar9.png';
import avatar10 from '../assets/avatar10.png';
import avatar11 from '../assets/avatar11.png';
import avatar12 from '../assets/avatar12.png';
import avatar13 from '../assets/avatar13.png';
import avatar14 from '../assets/avatar14.png';

const HomeTestimonials = () => {
  const testimonials = [
    {
      avatar: avatar9,
      name: "Sarah Thompson",
      location: "San Francisco, USA",
      rank: 5,
      comment: "The ebooks on AI in education have been a game-changer for my research. They provide in-depth insights and case studies that are invaluable for staying updated.",
    },
    {
      avatar: avatar10,
      name: "Raj Patel",
      location: "Mumbai, India",
      rank: 5,
      comment: "The whitepapers on renewable energy strategies have greatly influenced my work. They offer detailed data and analysis, helping me make informed decisions.",
    },
    {
      avatar: avatar11,
      name: "Emily Adams",
      location: "London, UK",
      rank: 5,
      comment: "The AI in healthcare reports have been an essential resource for our hospital. They highlight the latest innovations and best practices, improving patient care.",
    },
    {
      avatar: avatar12,
      name: "Alan Jackson",
      location: "Houston, USA",
      rank: 5,
      comment: "The reports on space mining prospects have fueled my passion for space exploration. They provide a comprehensive view of what lies beyond Earth.",
    },
    {
      avatar: avatar13,
      name: "Jessica Miller",
      location: "Boston, USA",
      rank: 5,
      comment: "The research papers on genomic breakthroughs have been a goldmine of information. They've shaped the direction of my research in genomics.",
    },
    {
      avatar: avatar14,
      name: "Diego Lopez",
      location: "Barcelona, Spain",
      rank: 5,
      comment: "The ebooks on renewable energy strategies have given me the insights I needed to pivot our startup toward sustainability.",
    }
  ];

  return (
    <div>
      <Title
        tag="What Our Readers Say"
        title="Real Words from Real Readers"
        button={{ text: "View All Testimonials", href: "posts" }}
      />
      <div className='hometestimonials'>
        {testimonials.map((person, index) => (
          <div className={`hometestimonials-item item-${index + 1}`} key={index}>
            <div className="content-wrapper">
              <div className="hometestimonials-item-person-info">
                <img src={person.avatar} alt="avatar" />
                <div className="hometestimonials-item-person-info-name">
                  <p className="person-name">{person.name}</p>
                  <p className="person-location">{person.location}</p>
                </div>
              </div>

              <div className="hometestimonials-item-person-comment">
                <div className="rating-wrapper">
                  <Rating
                    name="custom-rating"
                    value={person.rank}
                    precision={0.1}
                    icon={<Star fontSize="inherit" />}
                    emptyIcon={<StarBorder fontSize="inherit" />}
                    halficon={<StarHalf fontSize="inherit" />}
                    readOnly={true}
                  />
                </div>
                <p className="person-comment">{person.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default HomeTestimonials