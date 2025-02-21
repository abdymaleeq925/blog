import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';

import { registerValidation, loginValidation, postValidation } from './validations/validation.js';
import checkUser from './utils/checkUser.js';
import { login, profile, registration } from './controllers/userController.js';
import {
    create,
    getAll,
    getOne,
    update,
    remove,
    createTag,
    getAllTags,
    likeTogglePost,
    toggleComment,
    likeToggleComment,
    replyToggleComment,

} from './controllers/postController.js';
import handleValidation from './validations/handleValidation.js';


dotenv.config();

const app = express();
app.use(express.json()); //Обработка запроса
app.use(cors());
app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.REDACTED).then(console.log('DB is OK')).catch((error) => console.log('DB is NOT OK', error));

const storage = multer.diskStorage({
    destination: (_, __, cb) => { cb(null, 'uploads') },
    filename: (_, file, cb ) => { cb(null, file.originalname) }
});

const upload = multer({storage});

//CRUD
app.get('/', (request, response) => {
    response.send('Hello World!');
});
app.post('/auth/login', loginValidation, handleValidation, login);

app.post('/auth/registration', registerValidation, handleValidation, registration);

app.get('/auth/profile', checkUser, profile);

app.post('/post/create', checkUser, postValidation, handleValidation, create);

app.post('/upload', checkUser, upload.single('image'), (request, response) => {
    response.json ({
        url: `/uploads/${request.file.originalname}`
    });
});

app.post('/tags/create', checkUser, createTag);

app.get('/tags/get-all', getAllTags);

app.get('/posts', getAll);

app.get('/post/:id', getOne);

app.patch('/post/:id',checkUser, postValidation, handleValidation, update);

app.delete('/post/:id', checkUser, remove);

app.patch('/post/:postId/likeToggle', likeTogglePost);

app.patch('/post/:postId/toggleComment', toggleComment);

app.patch('/post/:postId/comment/:commentId/likeToggleComment', likeToggleComment);

app.patch('/post/:postId/comment/:commentId/replyToggle', replyToggleComment);

// app.set(); //Настройка запроса
// // app.get();

//Связка с frontend
app.listen('4444', (error) => {
    if (error) {
        console.error(error);
    }
    console.log('Server is OK');
});