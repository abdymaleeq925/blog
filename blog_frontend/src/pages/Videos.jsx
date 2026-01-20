import React, { useEffect, useState } from 'react';
import '../styles/videos.scss';
import { fetchAIVideos } from '../api/videos';
import { Button } from '../components/ui/Button';
import { Rating } from '@mui/material';
import { Star, StarBorder, StarHalf } from '@mui/icons-material';
import { IoArrowForwardCircle } from "react-icons/io5";
import { IoArrowBackCircle } from "react-icons/io5";
import videoIconOne from '../assets/icons/videoIconOne.svg';
import videoIconTwo from '../assets/icons/videoIconTwo.svg';
import exploreIcon from '../assets/icons/exploreIcon.svg';
import { Title } from '../components';

const Videos = () => {

    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filteredVideos, setFilteredVideos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const postsPerPage = 6;
    const totalPages =
      filteredVideos?.length > postsPerPage
        ? Math.ceil(filteredVideos?.length / postsPerPage)
        : 1;
    const currentData = filteredVideos?.slice(
      (currentPage - 1) * postsPerPage,
      currentPage * postsPerPage
    );

    useEffect(() => {
        setFilteredVideos(videos.slice(2))
    },[videos]);
    

    useEffect(() => {
        fetchAIVideos(30)
            .then(data => {
                setVideos(Array.isArray(data) ? data : data.items || []);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Загрузка видео...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <div className='videos'>
            <div className="videos__title">
                <div className="container">
                    <div className="banner">
                        <h1>Unlock the World of Artificial Intelligence </h1>
                        <div className="subbanner">
                            <h1>through Videos</h1>
                            <p>Dive deep into the AI universe with our collection of insightful podcasts. Explore the latest trends, breakthroughs, and discussions on artificial intelligence. Whether you're an enthusiast or a professional, our AI podcasts offer a gateway to knowledge and innovation.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='recent-videos container'>
                <div className="recent-videos-title-1">
                    <div className="recent-videos-title-container">
                        <img src={videoIconOne} alt="video-icon" />
                        <div className="recent-videos-title-content">
                            <h4 className='recent-videos-heading'>{videos[0].tag}</h4>
                            <div className="rating-wrapper">
                            <Rating
                                name="custom-rating"
                                value={5}
                                precision={0.1}                 // дробные с шагом 0.1
                                icon={<Star fontSize="inherit" />}
                                emptyIcon={<StarBorder fontSize="inherit" />}
                                halficon={<StarHalf fontSize="inherit" />}
                                readOnly={true}
                                onChange={(e, newValue) => console.log(newValue)}
                            />
                        </div>
                        </div>     
                    </div>
                    <div className="recent-videos-title-downloads">
                        <div className="recent-videos-content">
                            <p className='recent-videos-heading'>Host</p>
                            <p className='recent-videos-text'>{videos[0]?.author}</p>
                        </div>
                        <Button onClick={() => window.open(`${videos[0]?.id}`, '_blank')} btnName="Watch Video" btnIcon={exploreIcon}/>
                    </div>
                </div>
                <div className="recent-videos-description-1">
                    <img src={videos[0]?.thumbnail} alt="video-thumbnail" />
                    <div className="recent-videos-description-info-1">
                        <p className="recent-videos-description-heading-1">{videos[0]?.title}</p>
                        <p className="recent-videos-description-text-1">{videos[0]?.description}</p>
                    </div>
                    <div className="recent-videos-description-info-2">
                    <div className="recent-videos-total">
                            <p className="recent-videos-description-heading-2">Total Views</p>
                            <p className="recent-videos-description-text-2">{videos[0]?.views}</p>
                        </div>
                        <div className="recent-videos-total">
                            <p className="recent-videos-description-heading-2">Video Length</p>
                            <p className="recent-videos-description-text-2">{videos[0]?.duration}</p>
                        </div>
                        <div className="recent-videos-total">
                            <p className="recent-videos-description-heading-2">Published Date</p>
                            <p className="recent-videos-description-text-2">{new Date(videos[0]?.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}</p>
                        </div>
                        
                    </div>

                </div>

                <div className="recent-videos-title-2">
                <div className="recent-videos-title-container">
                        <img src={videoIconTwo} alt="video-icon" />
                        <div className="recent-videos-title-content">
                            <h4 className='recent-videos-heading'>{videos[1].tag}</h4>
                            <div className="rating-wrapper">
                            <Rating
                                name="custom-rating"
                                value={5}
                                precision={0.1}                 // дробные с шагом 0.1
                                icon={<Star fontSize="inherit" />}
                                emptyIcon={<StarBorder fontSize="inherit" />}
                                halficon={<StarHalf fontSize="inherit" />}
                                readOnly={true}
                                // onChange={(e, newValue) => console.log(newValue)}
                            />
                        </div>
                        </div>     
                    </div>
                    <div className="recent-videos-title-downloads">
                        <div className="recent-videos-content">
                            <p className='recent-videos-heading'>Host</p>
                            <p className='recent-videos-text'>{videos[1]?.channelTitle}</p>
                        </div>
                        <Button onClick={() => window.open(`${videos[1]?.id}`, '_blank')} btnName="Watch Video" btnIcon={exploreIcon}/>
                    </div>
                </div>
                <div className="recent-videos-description-2">
                    <img src={videos[1]?.thumbnail} alt="whitepapers-image" />
                    <div className="recent-videos-description-info-1">
                        <p className="recent-videos-description-heading-1">{videos[1]?.title}</p>
                        <p className="recent-videos-description-text-1">{videos[1]?.description}</p>
                    </div>
                    <div className="recent-videos-description-info-2">
                        <div className="recent-videos-total">
                            <p className="recent-videos-description-heading-2">Total Views</p>
                            <p className="recent-videos-description-text-2">{videos[1]?.views}</p>
                        </div>
                        <div className="recent-videos-total">
                            <p className="recent-videos-description-heading-2">Video Length</p>
                            <p className="recent-videos-description-text-2">{videos[1]?.duration}</p>
                        </div>
                        <div className="recent-videos-total">
                            <p className="recent-videos-description-heading-2">Published Date</p>
                            <p className="recent-videos-description-text-2">{new Date(videos[1]?.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}</p>
                        </div>
                        
                    </div>
                </div>

            </div>
            <Title
            tag="Stay Informed with Relevant Content"
            title="Other Videos"
            />
            <div className="other-videos container">
            {currentData.map( (video) => (
                <div className="other-videos-description" key={video?.id}>
                <img className='other-videos-thumbnail' src={video?.thumbnail} alt="video-thumbnail" />
                <div className="other-videos-description-info">
                    <p className="other-videos-description-heading">{video?.title}</p>
                    <p className="other-videos-description-text">{video?.description}</p>
                </div>
                <Button onClick={() => window.open(`${video?.id}`, '_blank')} btnName="Watch Video" btnIcon={exploreIcon}/>
            </div>
            ))}
            </div>
            {filteredVideos?.length > 6 && (
          <div className="pagination">
            <IoArrowBackCircle
              onClick={
                currentPage > 1
                  ? () => setCurrentPage((prev) => prev - 1)
                  : undefined
              }
              style={{
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                opacity: currentPage === 1 ? 0.5 : 1,
                fontSize: "45px",
              }}
            />
            <span>
              {currentPage} / {totalPages}
            </span>
            <IoArrowForwardCircle
              onClick={
                currentPage < totalPages
                  ? () => setCurrentPage((prev) => prev + 1)
                  : undefined
              }
              style={{
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                opacity: currentPage === totalPages ? 0.5 : 1,
                fontSize: "45px",
              }}
            />
          </div>
        )}
        </div>
    )
}

export default Videos