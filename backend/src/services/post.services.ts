import { database } from '../utils/database';
import type { PostInfo } from '../types';

const createPost = async (post: PostInfo) => {
  return database.post.create({
    data: post,
  });
};

const listPosts = async () => {
  return database.post.findMany({
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
};

const getPostById = async (id: string) => {
  return database.post.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
};

const updatePost = async (id: string, post: PostInfo) => {
  return database.post.update({
    data: post,
    where: {
      id,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
};

const deletePost = async (id: string) => {
  return database.post.delete({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
};

export default {
  createPost,
  listPosts,
  getPostById,
  updatePost,
  deletePost,
};
