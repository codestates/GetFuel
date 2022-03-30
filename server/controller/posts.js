import 'express-async-errors';
import * as postsRepository from '../data/posts.js';

export async function getPosts(req, res) {
  const allPosts = await postsRepository.getAllPosts();
  return res.status(200).json(allPosts);
}

export async function createPost(req, res) {
  const { text } = req.body;
  const post = await postsRepository.create(text, req.userId);
  res.status(201).json(post);
}

export async function updatePost(req, res) {
  const { text } = req.body;
  const postId = req.params.postid;
  const post = await postsRepository.getById(postId);
  if (!post) {
    return res.Status(404).json({ message: 'Can not find this post' });
  }
  if (post.author.id !== req.userId) {
    return res.sendStatus(403);
  }

  const updated = await postsRepository.update(text, id);
  res.status(200).json(updated);
}

export async function deletePost(req, res) {
  const postId = req.params.postid;
  const post = await postsRepository.getById(postId);

  if (!post) {
    return res.Status(404).json({ message: 'Can not find this post' });
  }
  if (post.author.id !== req.userId) {
    return res.sendStatus(403);
  }

  await postsRepository.remove(id);
  res.sendStatus(204);
}
