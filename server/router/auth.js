import express from 'express';
import * as authController from '../controller/auth.js'

const router = express.Router();

router.post('/singup', authController.singup);
router.post('/singin', authController.singin);
router.post('/singout', );
router.get('/refresh', );

export default router;