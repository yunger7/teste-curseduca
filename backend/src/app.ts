import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import api from './api';
import { errorHandler } from './middlewares';

const PORT = process.env['PORT'] || 8000;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.use('/api/v1', api);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[server]: App is running at https://localhost:${PORT}/`);
});
