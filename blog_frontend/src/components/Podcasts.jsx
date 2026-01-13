import React, { useEffect, useState } from 'react'
import Title from './Title'
import { fetchAIVideos } from '../api/videos';
import '../styles/podcasts.scss';
import { parseVideoDuration } from '../utils/parseVideoDuration';

const Podcasts = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAIVideos(4)
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
        <div className="podcasts">
            <Title
                tag="Featured Podcasts"
                title="Visual Insights for the Modern Viewer"
                button={{ text: "View All", href: "podcasts" }}
            />
            <div className="podcasts__grid">
                {videos.map(video => (
                    <div key={video.id} className="podcasts__card">
                        <div className="podcasts__video">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${video.id}?rel=0`}
                                title={video.snippet?.title || 'Video'}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                loading="lazy"
                            />
                            <div className="podcasts__duration">
                                {parseVideoDuration(video.contentDetails?.duration)}
                            </div>
                        </div>
                        <div className="podcasts__info">
                            <h4 className="podcasts__title">{video.snippet?.title}</h4>
                            <p className="podcasts__description">{video.snippet?.localized?.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Podcasts