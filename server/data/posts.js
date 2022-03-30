import Mongoose from 'mongoose';
import { userVirtualId } from '../database/database.js';

const Schema = Mongoose.Schema;

const postSchema = new Mongoose.Schema(
  {
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
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

export default Post;
