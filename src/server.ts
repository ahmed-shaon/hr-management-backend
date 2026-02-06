import dotenv from 'dotenv';
import express from 'express';
import routes from './routes/route';
import db from './config/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(routes);

app.listen(PORT, async () => {
  try {
    await db.raw('SELECT 1');
    // eslint-disable-next-line no-console -- server startup log
    console.log(`Server running at http://localhost:${PORT}`);
    // eslint-disable-next-line no-console -- db connection log
    console.log('Database connected');
  } catch (err) {
    // eslint-disable-next-line no-console -- connection error
    console.error('Database connection failed:', err);
    process.exit(1);
  }
});
