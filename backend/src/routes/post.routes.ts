import express from 'express';

import postServices from '../services/post.services';
import { isAuthenticated } from '../middlewares';

import type { PostInfo } from '../types';

const router = express.Router();

router.post('/', isAuthenticated, async (req, res, next) => {
  try {
    if (!req.payload) {
      res.status(401);
      throw new Error('User is not authenticated');
    }

    const { userId } = req.payload;

    const { title, content } = req.body as Partial<PostInfo>;

    if (!title) {
      res.status(400);
      throw new Error('Insufficient information. Required fields: title');
    }

    const post = await postServices.createPost({
      title,
      content,
      userId,
    });

    res.json(post);
  } catch (error) {
    next(error);
  }
});

router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    if (!req.payload) {
      res.status(401);
      throw new Error('User is not authenticated');
    }

    const posts = await postServices.listPosts();
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.get('/:postId', isAuthenticated, async (req, res, next) => {
  try {
    if (!req.payload) {
      res.status(401);
      throw new Error('User is not authenticated');
    }

    const post = await postServices.getPostById(req.params.postId);

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
});

router.put('/:postId', isAuthenticated, async (req, res, next) => {
  try {
    if (!req.payload) {
      res.status(401);
      throw new Error('User is not authenticated');
    }

    const { userId } = req.payload;

    const post = await postServices.getPostById(req.params.postId);

    if (!post) {
      res.status(403);
      throw new Error('This post does not exist');
    }

    if (post.userId != userId) {
      res.status(403);
      throw new Error('Insufficient permission');
    }

    const { title, content } = req.body as Partial<PostInfo>;

    if (!title) {
      res.status(400);
      throw new Error('Insufficient information. Required fields: title');
    }

    const updatedPost = await postServices.updatePost(req.params.postId, {
      title,
      content,
      userId,
    });

    res.json(updatedPost);
  } catch (error) {
    next(error);
  }
});

router.delete('/:postId', isAuthenticated, async (req, res, next) => {
  try {
    if (!req.payload) {
      res.status(401);
      throw new Error('User is not authenticated');
    }

    const { userId } = req.payload;

    const post = await postServices.getPostById(req.params.postId);

    if (!post) {
      res.status(403);
      throw new Error('This post does not exist');
    }

    if (post.userId != userId) {
      res.status(403);
      throw new Error('Insufficient permission');
    }

    const deletedPost = await postServices.deletePost(req.params.postId);

    res.json(deletedPost);
  } catch (error) {
    next(error);
  }
});

export default router;
