const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';
const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export async function fetchAIVideos() {
    if (!API_KEY) {
        throw new Error('YouTube API key is missing. Please set REACT_APP_YOUTUBE_API_KEY in .env');
    }

    try {
        // Список тем
        const topics = [
            "Quantum Computing",
            "AI Ethics",
            "Space Exploration",
            "Healthcare",
            "Biotechnology",
            "Renewable Energy"
        ];

        // Формируем поисковый запрос: AI + тема
        const query = topics
            .map(topic => `"${topic}" AI OR "artificial intelligence" "${topic}"`)
            .join(' OR ');

        const searchUrl = `${YOUTUBE_BASE_URL}/search?` +
            `part=snippet` +
            `&q=${encodeURIComponent(query)}` +
            `&type=video` +       // < 4 минуты
            `&maxResults=10` +               // берём больше, чтобы после фильтра осталось 6–12
            `&order=relevance` +
            `&relevanceLanguage=en` +        // английский — больше качественного контента
            `&key=${API_KEY}`;

        const searchResult = await fetch(searchUrl);

        if (!searchResult.ok) {
            const text = await searchResult.text().catch(() => '');
            throw new Error(
                `Failed to search YouTube: ${searchResult.status} ${searchResult.statusText} ${text}`.trim()
            );
        }

        const searchData = await searchResult.json();

        if (!searchData.items?.length) {
            return [];
        }

        // Получаем ID всех найденных видео
        const videoIds = searchData.items.map(item => item.id.videoId).join(',');

        // Второй запрос — получаем длительность и дополнительные данные
        const detailsUrl = `${YOUTUBE_BASE_URL}/videos?` +
            `part=snippet,contentDetails` +
            `&id=${videoIds}` +
            `&key=${API_KEY}`;

        const detailsResult = await fetch(detailsUrl);

        if (!detailsResult.ok) {
            throw new Error(`Failed to fetch video details: ${detailsResult.status}`);
        }

        const detailsData = await detailsResult.json();

        return detailsData;

    } catch (error) {
        console.error('Error fetching AI-related videos:', error);
        throw error;
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