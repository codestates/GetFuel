import express from 'express';
import 'express-async-errors';
import * as commentController from '../controller/comment.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const commentValidate = [
  body('text')
    .trim()
    .isLength({ min: 10 })
    .withMessage(' text should be at least 10 characters ')
    .isLength({ max: 100 })
    .withMessage(' Can not be more than 100 characters '),
  validate,
];

router.post('/', commentValidate, commentController.createComment);
router.put('/:commentid', commentValidate, commentController.updateComment);
router.delete('/:commentid', commentController.deleteComment);

export default router;
