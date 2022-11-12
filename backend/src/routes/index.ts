import express from 'express';
import auth from './auth.routes';
import posts from './post.routes';

const router = express.Router();

router.use('/auth', auth);
router.use('/posts', posts);

export default router;
