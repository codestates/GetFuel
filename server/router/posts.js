import express from 'express';
import 'express-async-errors';
import * as postsController from '../controller/posts.js';
import { isAuth } from '../middleware/auth.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validatePost = [
  body('text')
    .trim()
    .isLength({ min: 10 })
    .withMessage(' text should be at least 10 characters ')
    .isLength({ max: 100 })
    .withMessage(' Can not be more than 100 characters '),
  validate,
];

router.get('/', postsController.getPosts);
router.post('/:code', validatePost, postsController.createPost);
router.put('/:postid', validatePost, postsController.updatePost);
router.delete('/:postid', postsController.deletePost);
router.post('/:postid/comment', postsController.createComment);
router.put('/:postid/comment', postsController.updateComment);
router.delete('/:postid/comment', postsController.deleteComment);
export default router;
