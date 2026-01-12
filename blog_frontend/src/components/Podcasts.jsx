import React, { useEffect, useState } from 'react'
import Title from './Title'
import { fetchAIVideos } from '../api/videos';

function parseDuration(isoDuration) {
    if (!isoDuration) return 'N/A';
    const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 'N/A';
    const [, h, m, s] = match;
    const totalMins = (parseInt(h || 0) * 60) + parseInt(m || 0);
    const totalSecs = parseInt(s || 0);
    return `${totalMins}:${totalSecs.toString().padStart(2, '0')}`;
}

const Podcasts = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAIVideos()
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


    console.log("videos", videos)

    return (
        <div>
            <Title
                tag="Featured Podcasts"
                title="Visual Insights for the Modern Viewer"
                button={{ text: "View All", href: "podcasts" }}
            />
            <div className="ai-videos-grid">
            {videos.map(video => (
                    <div key={video.id} className="video-card">
                        {/* ← ИСПРАВЛЕННЫЙ iframe — используем video.id напрямую */}
                        <iframe
                            width="100%"
                            height="200"
                            src={`https://www.youtube.com/embed/${video.id}?rel=0`}  // ← из video.id
                            title={video.snippet?.title || 'Video'}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            loading="lazy"
                        />
                        <div className="video-info">
                            <h4 className="video-title">{video.snippet?.title}</h4>
                            <p className="video-meta">
                                {video.snippet?.channelTitle} • 
                                {parseDuration(video.contentDetails?.duration)}  {/* ← парсим длительность */}
                            </p>
                            <p className="video-desc">
                                {video.snippet?.description?.substring(0, 120) || ''}...
                            </p>
                        </div>
                        <img 
                            src={video.snippet?.thumbnails?.medium?.url} 
                            alt="Thumbnail"
                            className="video-thumb"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
            {/* <div className="podcasts">
            <div className="podcast-1">
                <video src=""></video>
                <div className="podcast-info">
                    <p></p>
                    <span></span>
                </div>
            </div>
            <div className="podcast-2">
                <video src=""></video>
                <div className="podcast-info">
                    <p></p>
                    <span></span>
                </div>
            </div>
            <div className="podcast-3">
                <video src=""></video>
                <div className="podcast-info">
                    <p></p>
                    <span></span>
                </div>
            </div>
            <div className="podcast-4">
                <video src=""></video>
                <div className="podcast-info">
                    <p></p>
                    <span></span>
                </div>
            </div>
        </div> */}
        </div>
    )
}

export default Podcasts