import express from 'express';
import authController from './auth.controller';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/refreshToken', authController.refreshToken);

export default router;
