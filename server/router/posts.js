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
router.post('/', isAuth, validatePost, postsController.createPost);
router.put('/:postid', isAuth, validatePost, postsController.updatePost);
router.delete('/:postid', isAuth, postsController.deletePost);
<<<<<<< HEAD

=======
router.post('/:postid/comment', isAuth, postsController.createComment);
router.put('/:postid/comment', isAuth, postsController.updateComment);
router.delete('/:postid/comment', isAuth, postsController.deleteComment);
>>>>>>> 97294cb8bc4bcded2ddc441b01149617a3d93e27
export default router;
