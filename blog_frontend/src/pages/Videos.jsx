import React, { useEffect, useState } from 'react';
import '../styles/videos.scss';
import { fetchAIVideos } from '../api/videos';
import { Button } from '../components/ui/Button';
import { Rating } from '@mui/material';
import { Star, StarBorder, StarHalf } from '@mui/icons-material';
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

const Videos = () => {

    const navigate = useNavigate();

    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    console.log("videos", videos)

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
            <div className='videos container'>
                <div className="videos-title-1">
                    <div className="videos-title-container">
                        <img src={ebooks} alt="ebooks" />
                        <div className="videos-title-content">
                            <h4 className='videos-heading'>{videos[0]?.snippet?.tags?.length > 0 ? videos[0]?.snippet?.tags[Math.floor(Math.random() * videos[0]?.snippet?.tags?.length)] : "No tag"}</h4>
                            <div className="rating-wrapper">
                            <Rating
                                name="custom-rating"
                                value={5}
                                precision={0.1}                 // дробные с шагом 0.1
                                icon={<Star fontSize="inherit" />}
                                emptyIcon={<StarBorder fontSize="inherit" />}
                                halfIcon={<StarHalf fontSize="inherit" />}
                                readOnly={false}
                                onChange={(e, newValue) => console.log(newValue)}
                            />
                        </div>
                        </div>     
                    </div>
                    <div className="videos-title-downloads">
                        <div className="videos-content">
                            <p className='videos-heading'>Host</p>
                            <p className='videos-text'>{videos[0]?.snippet?.channelTitle}</p>
                        </div>
                        <Button onClick={() => window.open(`https://www.youtube.com/watch?v=${videos[0]?.id}`, '_blank')} btnName="Watch Video" btnIcon={exploreIcon}/>
                    </div>
                </div>
                <div className="videos-description-1">
                    <img src={videos[0]?.snippet?.thumbnails?.maxres?.url} alt="ebooks-image" />
                    <div className="videos-description-info-1">
                        <p className="videos-description-heading-1">{videos[0]?.snippet?.localized?.title}</p>
                        <p className="videos-description-text-1">{videos[0]?.snippet?.localized?.description}</p>
                    </div>
                    <div className="videos-description-info-2">
                        <div className="videos-total">
                            <p className="videos-description-heading-2">Total Ebooks</p>
                            <p className="videos-description-text-2">Over 100 ebooks</p>
                        </div>
                        <div className="videos-total">
                            <p className="videos-description-heading-2">Total Ebooks</p>
                            <p className="videos-description-text-2">Over 100 ebooks</p>
                        </div>
                        <div className="videos-total">
                            <p className="videos-description-heading-2">Total Ebooks</p>
                            <p className="videos-description-text-2">Over 100 ebooks</p>
                        </div>
                        
                    </div>

                </div>

                <div className="videos-title-2">
                <div className="videos-title-container">
                        <img src={ebooks} alt="ebooks" />
                        <div className="videos-title-content">
                            <h4 className='videos-heading'>{videos[1]?.snippet?.tags?.length > 0 ? videos[1]?.snippet?.tags[Math.floor(Math.random() * videos[1]?.snippet?.tags?.length)] : "No tag"}</h4>
                            <div className="rating-wrapper">
                            <Rating
                                name="custom-rating"
                                value={5}
                                precision={0.1}                 // дробные с шагом 0.1
                                icon={<Star fontSize="inherit" />}
                                emptyIcon={<StarBorder fontSize="inherit" />}
                                halfIcon={<StarHalf fontSize="inherit" />}
                                readOnly={false}
                                onChange={(e, newValue) => console.log(newValue)}
                            />
                        </div>
                        </div>     
                    </div>
                    <div className="videos-title-downloads">
                        <div className="videos-content">
                            <p className='videos-heading'>Host</p>
                            <p className='videos-text'>{videos[1]?.snippet?.channelTitle}</p>
                        </div>
                        <Button onClick={() => window.open(`https://www.youtube.com/watch?v=${videos[1]?.id}`, '_blank')} btnName="Watch Video" btnIcon={exploreIcon}/>
                    </div>
                </div>
                <div className="videos-description-2">
                    <img src={videos[1]?.snippet?.thumbnails?.maxres?.url} alt="whitepapers-image" />
                    <div className="videos-description-info-1">
                        <p className="videos-description-heading-1">{videos[1]?.snippet?.localized?.title}</p>
                        <p className="videos-description-text-1">{videos[1]?.snippet?.localized?.description}</p>
                    </div>
                    <div className="videos-description-info-2">
                        <div className="videos-total">
                            <p className="videos-description-heading-2">Total Ebooks</p>
                            <p className="videos-description-text-2">Over 100 ebooks</p>
                        </div>
                        <div className="videos-total">
                            <p className="videos-description-heading-2">Total Ebooks</p>
                            <p className="videos-description-text-2">Over 100 ebooks</p>
                        </div>
                        <div className="videos-total">
                            <p className="videos-description-heading-2">Total Ebooks</p>
                            <p className="videos-description-text-2">Over 100 ebooks</p>
                        </div>
                        
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Videos