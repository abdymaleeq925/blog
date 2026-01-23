const CACHE_KEY = 'ai_resources_cache';
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 часов

const OPENALEX_API = new URL('https://api.openalex.org/works');
OPENALEX_API.searchParams.set('search', 'artificial intelligence machine learning LLM');
OPENALEX_API.searchParams.set('filter', 'type:report|book|proceedings-article');
OPENALEX_API.searchParams.set('sort', 'publication_date:desc');
OPENALEX_API.searchParams.set('per-page', '30');

export async function fetchAIResources() {
    const cached = localStorage.getItem(CACHE_KEY);

    if (cached) {
        try {
            const { timestamp, data } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_DURATION) {
                return data;
            }
        } catch {
            localStorage.removeItem(CACHE_KEY);
        }
    }

    try {
        const res = await fetch(OPENALEX_API);
        if (!res.ok) throw new Error(`OpenAlex: ${res.status}`);

        const { results = [] } = await res.json();

        const resources = results
            .map((item) => {
                const pdf = item.primary_location?.pdf_url;
                if (!pdf) return null;

                const abstract = item.abstract_inverted_index
                    ? Object.keys(item.abstract_inverted_index).join(' ')
                    : '';

                let category = 'Reports';
                if (item.type === 'book') category = 'Ebooks';
                if (item.type === 'report') category = 'Whitepapers';

                return {
                    id: item.id,
                    title: item.title || 'Untitled',
                    author: item.authorships?.map(a => a.author.display_name).filter(Boolean).join(', ') || 'Unknown',
                    description: abstract.slice(0, 480) + (abstract.length > 480 ? '...' : ''),
                    publishedAt: item.publication_date || null,
                    year: item.publication_year?.toString() || 'N/A',
                    link: pdf,
                    category,
                    tag: 'AI'
                };
            })
            .filter(Boolean);

        localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ timestamp: Date.now(), data: resources })
        );

        return resources;
    } catch (err) {
        console.error('Failed to fetch AI resources:', err);
        if (cached) {
            try {
                return JSON.parse(cached).data;
            } catch {
                return [];
            }
        }
        return [];
    }
}