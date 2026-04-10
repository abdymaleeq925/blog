import { Router } from 'express';

import { createMessage } from '../controllers/messageController.js';

const router = Router();

router.post('/', createMessage);

export default router;
