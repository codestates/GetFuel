import express from 'express';
import 'express-async-errors';
import * as authController from '../controller/auth.js'

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
//router.post('/singout', );
//router.get('/refresh', );


export default router;