import Mongoose from 'mongoose';
import { userVirtualId } from '../database/database.js';

const Schema = Mongoose.Schema;

<<<<<<< HEAD
=======
const commentSchema = new Mongoose.Schema(
  {
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

>>>>>>> 97294cb8bc4bcded2ddc441b01149617a3d93e27
const postSchema = new Mongoose.Schema(
  {
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
<<<<<<< HEAD
=======
    comments: [commentSchema],
>>>>>>> 97294cb8bc4bcded2ddc441b01149617a3d93e27
  },
  { timestamps: true }
);

userVirtualId(postSchema);
const Post = Mongoose.model('Post', postSchema);

export async function getAllPosts() {
  return Post.find().sort({ createdAt: -1 }).populate('author');
}

export async function getById(postId) {
  return Post.findById(postId).populate('author');
}

export async function create(text, userId) {
  return new Post({
    text,
    author: userId,
  }).save();
}

export async function update(text, postId) {
  return Post.findByIdAndUpdate(postId, { text }, { returnOriginal: false });
}

export async function remove(postId) {
  return Post.findByIdAndDelete(postId);
}

<<<<<<< HEAD
export default Post;
=======
export async function makeComment(text, postId, userId) {
  return Post.findByIdAndUpdate(
    postId,
    { $push: { comments: { text, author: userId } } },
    { returnOriginal: false }
  );
}

export async function modifyComment(text, postId, commentId) {
  return Post.updateOne(
    { postId, 'comments._id': commentId },
    { $set: { 'comments.$.text': text } }
  );
}

export async function deleteComment(postId, commentId) {
  return Post.findByIdAndUpdate(postId, {
    $pull: { comments: { _id: commentId } },
  });
}
>>>>>>> 97294cb8bc4bcded2ddc441b01149617a3d93e27
