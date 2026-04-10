import { Router } from 'express';
import fs from 'fs/promises';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

import checkUser from '../utils/checkUser.js';
import upload from '../config/multer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// Image upload (authenticated)
router.post('/upload', checkUser, upload.single('image'), (req, res) => {
  res.json({ url: `/uploads/${req.file.filename}` });
});

// PDF proxy with disk caching
const CACHE_DIR = path.join(__dirname, '..', 'pdf_cache');
fs.mkdir(CACHE_DIR, { recursive: true }).catch(() => {});

const getCachePath = (url) => {
  const hash = crypto.createHash('md5').update(url).digest('hex');
  return path.join(CACHE_DIR, `${hash}.pdf`);
};

router.get('/proxy/pdf', async (req, res) => {
  const pdfUrl = req.query.url;

  if (!pdfUrl) {
    return res.status(400).json({ error: 'Missing ?url parameter' });
  }

  const cachePath = getCachePath(pdfUrl);

  try {
    // 1. Try to serve from cache
    try {
      await fs.access(cachePath);
      console.log(`[Cache HIT] Serving from disk: ${pdfUrl}`);

      res.set({
        'Content-Type': 'application/pdf',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=86400',
        'X-Cache': 'HIT',
      });

      return res.sendFile(cachePath);
    } catch {
      console.log(`[Cache MISS] Fetching from source: ${pdfUrl}`);
    }

    // 2. Fetch from source if not in cache
    const response = await fetch(pdfUrl, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/pdf,*/*;q=0.9',
        'Referer': 'https://openalex.org/',
      },
      signal: AbortSignal.timeout(20000),
    });

    if (!response.ok) {
      return res.status(response.status).send(`Source error: ${response.statusText}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    // 3. Save to cache
    await fs.writeFile(cachePath, buffer);
    console.log(`[Cache SAVED] ${pdfUrl}`);

    // 4. Send to client
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': buffer.length,
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
      'X-Cache': 'MISS',
    });

    res.send(buffer);
  } catch (err) {
    console.error(`[Proxy ERROR] ${err.message}`);
    if (err.name === 'TimeoutError') {
      return res.status(504).json({ error: 'Timeout fetching PDF' });
    }
    res.status(502).json({ error: 'Proxy fetch failed' });
  }
});

export default router;
