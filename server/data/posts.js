import Mongoose from 'mongoose';
import { userVirtualId } from '../database/database.js';

const Schema = Mongoose.Schema;

const postSchema = new Mongoose.Schema({
  text: { type: String, required: true },
  author: { type:Schema.Types.ObjectId, ref: 'User' },
},
{ timestamps: true }
);

userVirtualId(postSchema);
const Post = Mongoose.model('Post', postSchema);

export async function getAllPosts() {
  return Post.find().sort( { createdAt: -1 } ).populate('author');
}

export async function getById(id) {
  return Post.findById(id).populate('author');
}

export async function create(text, userId) {
  return new Post({
      text,
      author: userId
    })
  .save()
}

export async function update(text, id) {
  return Post.findByIdAndUpdate(id, {text}, {returnOriginal: false});
}

export async function remove(id) {
  return Post.findByIdAndDelete(id);
}