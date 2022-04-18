import express from 'express';
import 'express-async-errors';
import googleOAuth from '../controller/googleOAuth.js';
import kakaoOAuth from '../controller/kakaoOAuth.js';

const router = express.Router();

router.get('/google/login', googleOAuth);
router.get('/kakao/login', kakaoOAuth);

export default router;
