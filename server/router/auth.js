import express from 'express';
import 'express-async-errors';
import * as authController from '../controller/auth.js'

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.get('/refresh', );
router.post('/singout', );
router.delete('/deleteaccount', );


export default router;