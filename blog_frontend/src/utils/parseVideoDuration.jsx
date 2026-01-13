export function parseVideoDuration(isoDuration) {
    if (!isoDuration) return 'N/A';
    const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 'N/A';
    const [, h, m, s] = match;
    const totalMins = (parseInt(h || 0) * 60) + parseInt(m || 0);
    const totalSecs = parseInt(s || 0);
    return `${totalMins}:${totalSecs.toString().padStart(2, '0')}`;
}