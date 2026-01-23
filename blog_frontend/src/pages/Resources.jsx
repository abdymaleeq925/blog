import React, { useState, useEffect, useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import '../styles/resources.scss';
import { Title } from '../components';
import { fetchAIResources } from '../api/resources';

import videoIconOne from '../assets/icons/videoIconOne.svg';
import videoIconTwo from '../assets/icons/videoIconTwo.svg';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Resources = () => {

    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [activeCategory, setActiveCategory] = useState("Whitepapers");


    const categories = useMemo(() => {
        const cats = [...new Set(resources.map(r => r.category))];
        return cats.length ? cats : ['Whitepapers', 'Reports', 'Ebooks'];
    }, [resources]);

    // Автоматический выбор категории, если текущая пропала
    useEffect(() => {
        if (!categories.includes(activeCategory) && categories.length > 0) {
            setActiveCategory(categories[0]);
        }
    }, [categories, activeCategory]);

    useEffect(() => {
        let mounted = true;
        const loadData = async () => {
            try {
                const data = await fetchAIResources();
                if (mounted) setResources(data);
            } catch (err) {
                if (mounted) setError('Не удалось загрузить ресурсы');
            } finally {
                if (mounted) setLoading(false);
            }
        };
        loadData();
        return () => { mounted = false; };
    }, []);

    const getPdfProxyUrl = (url) => {
        if (!url) return null;
        const backendBase = process.env.NODE_ENV === 'development'
          ? 'http://localhost:4444'
          : 'https://your-backend-domain.com';   // ← здесь ваш реальный прод-адрес
    
        return `${backendBase}/proxy/pdf?url=${encodeURIComponent(url)}`;
      };

    if (loading) return <div className="resources">Загрузка ресурсов...</div>;
    if (error) return <div className="resources error">{error}</div>;

    const filtered = resources.filter(r => r.category === activeCategory);
    const others   = resources.filter(r => r.category !== activeCategory);

    const featured1 = filtered[0];
    const featured2 = filtered[1];

    return (
        <div className='resources'>
            <div className="resources__banner">
                <div className="top-block">
                    <div className="banner">
                        <h1>Unlock a World of</h1>
                        <div className="subbanner">
                            <h1>Knowledge</h1>
                            <p>Dive deep into the AI universe with our collection of insightful podcasts. Explore the latest trends, breakthroughs, and discussions on artificial intelligence. Whether you're an enthusiast or a professional, our AI podcasts offer a gateway to knowledge and innovation.</p>
                        </div>
                    </div>
                </div>
                <div className="bottom-block">
                    <div className="block">
                        <p className="block-heading">300<span>+</span></p>
                        <p className="block-parapgraph">Resources available</p>
                    </div>
                    <div className="block">
                        <p className="block-heading">12k<span>+</span></p>
                        <p className="block-parapgraph">Total downloads</p>
                    </div>
                    <div className="block">
                        <p className="block-heading">10k<span>+</span></p>
                        <p className="block-parapgraph">Active users</p>
                    </div>
                    <div className="block">
                        <p className="block-heading">100<span>+</span></p>
                        <p className="block-parapgraph">Countries Accesses Our Content</p>
                    </div>
                </div>
            </div>
            <Title tag="Dive into the Details" title="In-Depth Reports and Analysis" buttons={categories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
            <div className='recent-resources'>
                <div className="recent-resources-title-1">
                    <div className="recent-resources-title-container">
                        <img src={videoIconOne} alt="video-icon" />
                        <div className="recent-resources-title-content">
                            <h4 className='recent-resources-heading'>{featured1.category} / Featured</h4>
                            <p className='recent-resources-paragraph'>Provides technical specifications and requirements for implementing quantum computing systems.</p>
                        </div>
                    </div>
                </div>
                <div className="recent-resources-description-1">
                    {featured1 && (
                        <div className="pdf-preview">
                        <Document
                            file={getPdfProxyUrl(featured1.link)}
                            loading="Загрузка страницы..."
                            error="Не удалось загрузить PDF"
                            onLoadError={console.error}
                        >
                            <Page
                                pageNumber={1}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                                renderMode="canvas"
                                scale={1.1}           // чуть крупнее для превью
                                width={520}           // подберите под дизайн
                                height={720}
                            />
                        </Document>
                    </div>
                    )}
                    <div className="recent-resources-description-info-1">
                        <p className="recent-resources-description-heading-1">{featured1?.title}</p>
                        <p className="recent-resources-description-text-1">{featured1?.description}</p>
                    </div>
                    <div className="recent-resources-description-info-2">
                        <div className="recent-resources-total">
                            <p className="recent-resources-description-heading-2">Published Date</p>
                            <p className="recent-resources-description-text-2">{featured1?.publishedAt}</p>
                        </div>
                        <div className="recent-resources-total">
                            <p className="recent-resources-description-heading-2">Category</p>
                            <p className="recent-resources-description-text-2">{featured1?.tag}</p>
                        </div>
                        <div className="recent-resources-total">
                            <p className="recent-resources-description-heading-2">Author</p>
                            <p className="recent-resources-description-text-2">{featured1?.author}</p>
                        </div>

                    </div>

                </div>

                <div className="recent-resources-title-2">
                    <div className="recent-resources-title-container">
                        <img src={videoIconTwo} alt="video-icon" />
                        <div className="recent-resources-title-content">
                            <h4 className='recent-resources-heading'>Space Exploration Whitepaper</h4>
                            <p className='recent-resources-paragraph'>Explores Mars colonization, asteroid resource potential, and space tourism.</p>
                        </div>
                    </div>
                </div>
                <div className="recent-resources-description-2">
                    {featured2 && (
                        <div className="pdf-preview">
                        <Document
                            file={getPdfProxyUrl(featured2.link)}
                            loading="Загрузка страницы..."
                            error="Не удалось загрузить PDF"
                            onLoadError={console.error}
                        >
                            <Page
                                pageNumber={1}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                                renderMode="canvas"
                                scale={1.1}           // чуть крупнее для превью
                                width={520}           // подберите под дизайн
                                height={720}
                            />
                        </Document>
                    </div>
                    )}
                    <div className="recent-resources-description-info-1">
                        <p className="recent-resources-description-heading-1">{featured2?.title}</p>
                        <p className="recent-resources-description-text-1">{featured2?.description}</p>
                    </div>
                    <div className="recent-resources-description-info-2">
                        <div className="recent-resources-total">
                            <p className="recent-resources-description-heading-2">Total Views</p>
                            <p className="recent-resources-description-text-2">{featured2?.views}</p>
                        </div>
                        <div className="recent-resources-total">
                            <p className="recent-resources-description-heading-2">Video Length</p>
                            <p className="recent-resources-description-text-2">{featured2?.duration}</p>
                        </div>
                        <div className="recent-resources-total">
                            <p className="recent-resources-description-heading-2">Published Date</p>
                            <p className="recent-resources-description-text-2">{new Date(featured2?.date).toLocaleDateString('en-US', {
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
                title="Other resources"
            />
            <div className="other-resources">
                {others.map((resource) => (
                    <div className="other-resources-description" key={resource?.id}>
                        <div className="pdf-mini-preview">
                            <Document file={getPdfProxyUrl(resource.link)} loading="">
                                <Page
                                    pageNumber={1}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                    scale={0.6}
                                    width={180}
                                />
                            </Document>
                        </div>
                        <div className="other-resources-description-info">
                            <p className="other-resources-description-heading">{resource?.title}</p>
                            <p className="other-resources-description-text">{resource?.description}</p>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Resources