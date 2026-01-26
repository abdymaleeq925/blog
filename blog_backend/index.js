import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import crypto from 'crypto';
import { fileURLToPath } from "url";
import path, { dirname, join, extname } from "path";
import { registerValidation, loginValidation, postValidation } from './validations/validation.js';
import checkUser from './utils/checkUser.js';
import { login, profile, registration } from './controllers/userController.js';
import {
    create,
    getAll,
    getOne,
    update,
    remove,
    likeTogglePost,
    shareTogglePost,
    toggleComment,
    likeToggleComment,
    replyToggleComment,

} from './controllers/postController.js';
import { createMessage } from './controllers/messageController.js';
import handleValidation from './validations/handleValidation.js';
import { handleMulterError } from './utils/handleMulterError.js';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json()); //Обработка запроса
app.use(cors());
app.use("/uploads", express.static(join(__dirname, "uploads")));

mongoose.connect(process.env.DB_URL).then(console.log('DB is OK')).catch((error) => console.log('DB is NOT OK', error));

const storage = multer.diskStorage({
    destination: (_, __, cb) => { cb(null, 'uploads') },
    filename: (_, file, cb) => {
        // Лучше генерировать уникальное имя, чтобы избежать конфликтов
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname));
      },
});

// Валидация файла
const fileFilter = (req, file, cb) => {
    // Проверяем MIME-тип
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Неверный формат изображения. Разрешены только JPG, PNG, GIF, WebP.'));
    }
  };

  const upload = multer({
    storage,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5 MB максимум (можно изменить)
    },
    fileFilter,
  });

app.use(cors({ origin: ['http://localhost:3000', 'https://blog-frontend-4j7d.onrender.com'], credentials: true }));


//CRUD
app.get('/', (request, response) => {
    response.send('Hello World!');
});
app.post('/auth/login', loginValidation, handleValidation, login);

// first parse multipart/form-data (avatar + fields), then validate the parsed body
app.post('/auth/registration', upload.single('avatar'), handleMulterError, registerValidation, handleValidation, registration);

app.get('/auth/profile', checkUser, profile);

app.post('/post/create', checkUser, postValidation, handleValidation, create);

app.post('/upload', checkUser, upload.single('image'), (request, response) => {
    response.json ({
        url: `/uploads/${request.file.filename}`
    });
});

app.get('/posts', getAll);

app.get('/post/:id', getOne);

app.patch('/post/:id',checkUser, postValidation, handleValidation, update);

app.delete('/post/:id', checkUser, remove);

app.patch('/post/:postId/likeToggle', likeTogglePost);

app.patch('/post/:postId/shareToggle', shareTogglePost);

app.patch('/post/:postId/toggleComment', toggleComment);

app.patch('/post/:postId/comment/:commentId/likeToggleComment', likeToggleComment);

app.patch('/post/:postId/comment/:commentId/replyToggle', replyToggleComment);

// Папка для хранения PDF
const CACHE_DIR = path.join(__dirname, 'pdf_cache');

// Создаем папку, если её нет
fs.mkdir(CACHE_DIR, { recursive: true }).catch(() => {});

const getCachePath = (url) => {
  const hash = crypto.createHash('md5').update(url).digest('hex');
  return path.join(CACHE_DIR, `${hash}.pdf`);
};

app.get('/proxy/pdf', async (req, res) => {
  const pdfUrl = req.query.url;

  if (!pdfUrl) {
    return res.status(400).json({ error: 'Missing ?url parameter' });
  }

  const cachePath = getCachePath(pdfUrl);

  try {
    // 1. Пытаемся отдать из кэша
    try {
      await fs.access(cachePath);
      console.log(`[Cache HIT] Serving from disk: ${pdfUrl}`);
      
      // Устанавливаем заголовки для кэшированного файла
      res.set({
        'Content-Type': 'application/pdf',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=86400', // Кэш в браузере на сутки
        'X-Cache': 'HIT' // Полезно для отладки
      });
      
      return res.sendFile(cachePath);
    } catch (cacheErr) {
      // Файла нет в кэше, идем дальше к загрузке
      console.log(`[Cache MISS] Fetching from source: ${pdfUrl}`);
    }

    // 2. Загружаем, если в кэше не нашли
    const response = await fetch(pdfUrl, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        'Accept': 'application/pdf,*/*;q=0.9',
        'Referer': 'https://openalex.org/',
      },
      signal: AbortSignal.timeout(20000),
    });

    if (!response.ok) {
      return res.status(response.status).send(`Source error: ${response.statusText}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    // 3. Сохраняем в кэш для следующих запросов
    await fs.writeFile(cachePath, buffer);
    console.log(`[Cache SAVED] ${pdfUrl}`);

    // 4. Отправляем пользователю
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': buffer.length,
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
      'X-Cache': 'MISS'
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

// Contacts page messages
app.post('/messages', createMessage);

// app.set(); //Настройка запроса
// // app.get();

//Связка с frontend
app.listen('4444', (error) => {
    if (error) {
        console.error(error);
    }
    console.log('Server is OK');
});