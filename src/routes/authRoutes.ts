import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { validateSchema } from '../middleware/validatedata';
import { catchAsync } from '../middleware/catchAsync';
import { createUserSchema, signInSchema } from '../validators/authValidator';

const router = Router();

const authController = new AuthController();

router.post(
    '/register',
    validateSchema(createUserSchema),
    catchAsync(authController.createUser)
);

router.post(
    '/login',
    validateSchema(signInSchema),
    catchAsync(authController.signIn)
);

export default router;
