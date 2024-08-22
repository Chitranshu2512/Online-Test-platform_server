// this is test.route.js


import { Router } from 'express';
import { getTests, attemptTest } from '../controllers/test.controller.js';
import {authMiddleware} from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/').post(authMiddleware, getTests);
router.route('/attemptTest').post(authMiddleware, attemptTest);


export default router;


