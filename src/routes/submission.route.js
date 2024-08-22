// this is submission.route.js

import { Router } from 'express';
import { submitTest } from '../controllers/submission.controller.js';
import {authMiddleware} from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/').post(authMiddleware, submitTest);

export default router;


