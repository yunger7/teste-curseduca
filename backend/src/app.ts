import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const PORT = process.env['PORT'] || 8000;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(PORT, () => {
  console.log(`[server]: App is running at https://localhost:${PORT}/`);
});
