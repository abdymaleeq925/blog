import { Router } from 'express';

import { registerValidation, loginValidation } from '../validations/validation.js';
import handleValidation from '../validations/handleValidation.js';
import checkUser from '../utils/checkUser.js';
import { handleMulterError } from '../utils/handleMulterError.js';
import upload from '../config/multer.js';
import { login, profile, registration } from '../controllers/userController.js';

const router = Router();

router.post('/login', loginValidation, handleValidation, login);

router.post(
  '/registration',
  upload.single('avatar'),
  handleMulterError,
  registerValidation,
  handleValidation,
  registration
);

router.get('/profile', checkUser, profile);

export default router;
