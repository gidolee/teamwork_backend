import { Router } from 'express';
import { createUser, signIn } from '../controllers/authController';
import authenticate from '../middleware/auth';
import adminOnly from '../middleware/adminOnly';

const router = Router();

router.post('/create-user', authenticate, adminOnly, createUser);
router.post('/signin', signIn);

export default router;
