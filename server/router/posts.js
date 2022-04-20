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

router.get('/', isAuth, postsController.getPosts);
router.post('/:code', isAuth, validatePost, postsController.createPost);
router.put('/:postid', isAuth, validatePost, postsController.updatePost);
router.delete('/:postid', isAuth, postsController.deletePost);
router.post('/:postid/comment', isAuth, postsController.createComment);
router.put('/:postid/comment', isAuth, postsController.updateComment);
router.delete('/:postid/comment', isAuth, postsController.deleteComment);
export default router;
