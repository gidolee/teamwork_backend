import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { validateSchema } from '../middleware/validatedata';
import { catchAsync } from '../middleware/catchAsync';
import {
    createUserSchema,
    signInSchema,
    updateUserSchema,
} from '../validators/authValidator';
import adminOnly from '../middleware/adminOnly';
import authenticate from '../middleware/auth';

const router = Router();

const authController = new AuthController();

router.post(
    '/register',
    authenticate,
    adminOnly,
    validateSchema(createUserSchema),
    catchAsync(authController.createUser)
);

router.post(
    '/login',
    validateSchema(signInSchema),
    catchAsync(authController.signIn)
);

router.patch(
    '/updateUser',
    authenticate,
    adminOnly,
    validateSchema(updateUserSchema),
    catchAsync(authController.updateUser)
);

export default router;
