import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { validateSchema } from '../middleware/validatedata';
import { createUserSchema, signInSchema } from '../validators/authValidator';

const router = Router();

const authController = new AuthController();

router.post(
    '/register',
    validateSchema(createUserSchema),
    authController.createUser
);

router.post('/login', validateSchema(signInSchema), authController.signIn);

export default router;
