const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';
const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const CACHE_KEY = 'ai_videos_cache';
const CACHE_DURATION = 60 * 60 * 6000;

export async function fetchAIVideos(q) {

    const cached = localStorage.getItem(CACHE_KEY);
    if(cached) {
        const { timestamp, data } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
            return data;
        }
    }

    if (!API_KEY) {
        throw new Error('YouTube API key is missing.');
    }

    try {
        // Список тем
        const query = "AI Quantum Computing Space Exploration Biotechnology Renewable Energy Healthcare";

        // 2. Выполняем 2 поиска параллельно (по 100 баллов каждый)
        const [freshRes, relevantRes] = await Promise.all([
            // 2 самых свежих
            fetch(`${YOUTUBE_BASE_URL}/search?part=id&q=${encodeURIComponent(query)}&type=video&videoDuration=medium&order=date&maxResults=2&key=${API_KEY}`),
            // 30 релевантных
            fetch(`${YOUTUBE_BASE_URL}/search?part=id&q=${encodeURIComponent(query)}&type=video&videoDuration=medium&order=relevance&maxResults=30&key=${API_KEY}`)
        ]);

        const freshData = await freshRes.json();
        const relevantData = await relevantRes.json();

        // 3. Собираем уникальные ID
        const allIds = [
            ...(freshData.items || []),
            ...(relevantData.items || [])
        ].map(item => item.id.videoId);

        const uniqueIds = [...new Set(allIds)].join(',');

        // 4. Один запрос за деталями (1 балл)
        const detailsUrl = `${YOUTUBE_BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${uniqueIds}&key=${API_KEY}`;
        const detailsResult = await fetch(detailsUrl);
        const detailsData = await detailsResult.json();

        const formattedVideos = detailsData?.items?.map(video => ({
            id: video.id,
            title: video.snippet.title,
            author: video.snippet.channelTitle,
            thumbnail: video.snippet.thumbnails.high.url,
            description: video.snippet.localized.description,
            duration: formatDuration(parseISODuration(video.contentDetails.duration)),
            views: video.statistics.viewCount,
            date: video.snippet.publishedAt,
            tag: video?.snippet?.tags?.length > 0 ? video?.snippet?.tags[Math.floor(Math.random() * video?.snippet?.tags?.length)] : "No tag",
            link: `https://www.youtube.com/watch?v=${video.id}`
        }));

        // 5. Сохраняем в кеш
        localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            data: formattedVideos
        }));

        return formattedVideos;

    } catch (error) {
        console.error('Error fetching AI-related videos:', error);
        return cached ? JSON.parse(cached).data : [];
    }
}

// Вспомогательные функции

function parseISODuration(duration) {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;
    const [, hours, minutes, seconds] = match;
    return (parseInt(hours || 0) * 3600) +
           (parseInt(minutes || 0) * 60) +
           parseInt(seconds || 0);
}

function formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}