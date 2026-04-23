// import { Router } from 'express';
// import { createUser, signIn } from '../controllers/authController';
// import authenticate from '../middleware/auth';
// import adminOnly from '../middleware/adminOnly';

// const router = Router();

// router.post('/create-user', authenticate, adminOnly, createUser);
// router.post('/signin', signIn);

// export default router;

import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { AuthService } from '../services/authService';

const router = Router();

const authService = new AuthService();

const authController = new AuthController(authService);

router.post('/register', authController.createUser);
router.post('/login', authController.signIn);

export default router;
