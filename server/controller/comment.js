import 'express-async-errors';
import Comment from '../data/commentSchema.js';

export async function createComment(req, res) {
  // Getting the text and  userid from request
  const text = req.body.text;
  const userid = req.body.userId;

  // Allocate each of them to comment schema
  const newComment = new Comment({ text: text, author: userid });
  res.status(201).json({ comment: newComment });
  post
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
}

export async function updateComment(req, res) {
  const commentid = req.params.commentid;
  const editComment = req.body.text;
  Comment.updateOne({ _id: commentid }, { text: editComment })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
}

export async function deleteComment(req, res) {
  const commentid = req.params.commentid;
  Comment.remove({ _id: commentid })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
}
