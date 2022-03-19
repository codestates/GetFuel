import express from 'express';
import 'express-async-errors';
import * as authController from '../controller/auth.js'
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.get('/refresh', authController.refresh);
router.get('/signout', isAuth, authController.signout);
router.delete('/deleteaccount', );


export default router;