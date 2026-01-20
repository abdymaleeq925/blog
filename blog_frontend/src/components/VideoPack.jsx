import React, { useEffect, useState } from 'react'
import Title from './Title'
import { fetchAIVideos } from '../api/videos';
import '../styles/videoPack.scss';
import PostSkeleton from './Skeleton';

const VideoPack = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadVideos = async () => {
            try {
              const data = await fetchAIVideos();
              // Убеждаемся, что это массив
              const videoArray = Array.isArray(data) ? data : data?.items || [];
              setVideos(videoArray);
            } catch (err) {
              setError(err.message || "Failed to load videos");
              console.error("Video fetch error:", err);
            } finally {
              setLoading(false);
            }
          };
      
          loadVideos();
    }, []);

    if (error) {
        return (
            <div className="videoPack">
                <Title
                    tag="Featured videoPack"
                    title="Visual Insights for the Modern Viewer"
                    button={{ text: "View All", href: "videoPack" }}
                />
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--grey-60)' }}>
                    Ошибка: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="videoPack">
            <Title
                tag="Featured Videos"
                title="Visual Insights for the Modern Viewer"
                button={{ text: "View All", href: "videoPack" }}
            />
            <div className="videoPack__grid">
                {loading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                        <div key={`skeleton-${index}`} className="videoPack__card">
                            <PostSkeleton variant="video" />
                        </div>
                    ))
                ) : (
                    videos.slice(0, 4).map(video => (
                        <div key={video.id} className="videoPack__card">
                            <div className="videoPack__video">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${video.id}`}
                                    title={video.title || 'Video'}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                    loading="lazy"
                                />
                                <div className="videoPack__duration">
                                    {video.duration}
                                </div>
                            </div>
                            <div className="videoPack__info">
                                <h4 className="videoPack__title">{video.title}</h4>
                                <p className="videoPack__description">{video.description}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default VideoPack