import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from "url";
import { dirname, join, extname } from "path";
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