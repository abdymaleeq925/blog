import { Router } from 'express';

import { postValidation } from '../validations/validation.js';
import handleValidation from '../validations/handleValidation.js';
import checkUser from '../utils/checkUser.js';
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
} from '../controllers/postController.js';

const router = Router();

// Public
router.get('/posts', getAll);
router.get('/post/:id', getOne);

// Protected — require authentication
router.post('/post/create', checkUser, postValidation, handleValidation, create);
router.patch('/post/:id', checkUser, postValidation, handleValidation, update);
router.delete('/post/:id', checkUser, remove);

// Social interactions — require authentication
router.patch('/post/:postId/likeToggle', checkUser, likeTogglePost);
router.patch('/post/:postId/shareToggle', checkUser, shareTogglePost);
router.patch('/post/:postId/toggleComment', checkUser, toggleComment);
router.patch('/post/:postId/comment/:commentId/likeToggleComment', checkUser, likeToggleComment);
router.patch('/post/:postId/comment/:commentId/replyToggle', checkUser, replyToggleComment);

export default router;
