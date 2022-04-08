import express from 'express';
import 'express-async-errors';
import * as authController from '../controller/auth.js';
import { body } from 'express-validator';
import { isAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateUpdateInfo = [
  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage(' The password must be at least 8 characters long '),
  validate,
];

const validateSignin = [
  ...validateUpdateInfo,
  body('email', 'please check email')
    .trim()
    .notEmpty()
    .normalizeEmail()
    .isEmail()
    .withMessage(' invalid email '),
  validate,
];

const validateSignup = [
  ...validateSignin,
  body('nickname')
    .trim()
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage(' The nickname must be at least 2 characters long '),
  validate,
];

router.post('/signup', validateSignup, authController.signup);
router.post('/signin', validateSignin, authController.signin);
router.get('/refresh', authController.refresh);
router.get('/signout', isAuth, authController.signout);
router.put(
  '/updateinfo/:id',
  isAuth,
  validateUpdateInfo,
  authController.updateInfo
);
router.delete('/deleteaccount/:id', isAuth, authController.deleteAccount);

export default router;
